const API_URL = 'http://localhost:3000/lionking';

document.addEventListener('DOMContentLoaded', () => {
    loadCharacters(1);
});

async function loadCharacters(page) {
    const search = document.getElementById('search').value || '';
    try {
        const response = await fetch(`${API_URL}?page=${page}&search=${search}`);
        const { character, totalPages } = await response.json();
        const tableBody = document.getElementById('charactersTableBody');
        tableBody.innerHTML = '';
        character.forEach(char => {
            const row = `
                <tr >
                    <td class="border-b py-2 px-2 text-xs sm:text-sm md:text-base lg:text-lg">${char.id}</td>
                    <td class="border-b py-2 px-2 text-xs sm:text-sm md:text-base lg:text-lg">${char.name}</td>
                    <td class="border-b py-2 px-2 text-xs sm:text-sm md:text-base lg:text-lg">${char.species}</td>
                    <td class="border-b py-2 px-2 text-xs sm:text-sm md:text-base lg:text-lg">${char.description}</td>
                    <td class="border-b py-2 px-2 text-xs sm:text-sm md:text-base lg:text-lg">"${char.movie_quote}"</td>
                    <td class="border-b py-2 px-2">
                        <button onclick="editCharacter(${char.id})" class="bg-purple-500 text-white px-2 py-1 rounded-md">Edit</button>
                        <button onclick="deleteCharacter(${char.id})" class="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                    </td>
                </tr>
            `;

            tableBody.innerHTML += row;
        });
        // Update pagination controls
        updatePaginationControls(page, totalPages);
    } catch (error) {
        console.error('Error loading characters:', error);
    }
}

function updatePaginationControls(currentPage, totalPages) {
    const controls = document.getElementById('paginationControls');
    controls.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        controls.innerHTML += `
            <button onclick="loadCharacters(${i})" class="px-4 py-2 ${i === currentPage ? 'bg-purple-400 text-white' : 'bg-gray-200'} rounded-md">${i}</button>
        `;
    }
}

function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Add Character';
    document.getElementById('characterId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('species').value = '';
    document.getElementById('description').value = '';
    document.getElementById('movie_quote').value = '';
    document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

async function editCharacter(id) {
try {
    const response = await fetch(`${API_URL}/${id}`);
    const { character } = await response.json();

    // Populate the fields of the edit modal with character data
    document.getElementById('editCharacterId').value = character.id;
    document.getElementById('editName').value = character.name;
    document.getElementById('editSpecies').value = character.species;
    document.getElementById('editDescription').value = character.description;
    document.getElementById('editMovieQuote').value = character.movie_quote;

    // Open the edit modal
    document.getElementById('editModal').classList.remove('hidden');
} catch (error) {
    console.error('Error fetching character:', error);
}
}


// Close the edit modal
function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
}

async function deleteCharacter(id) {
    try {
        const response = await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
        const result = await response.json();
        
        if (result.message === 'Character deleted successfully') {
            loadCharacters(1);  // Reload characters after delete
        } else {
            alert('Error deleting character');
        }
    } catch (error) {
        console.error('Error deleting character:', error);
    }
}

document.getElementById('characterForm').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent form from reloading the page

    const id = document.getElementById('characterId').value;
    const name = document.getElementById('name').value;
    const species = document.getElementById('species').value;
    const description = document.getElementById('description').value;
    const movie_quote = document.getElementById('movie_quote').value;

    const data = { name, species, description, movie_quote };

    try {
        let response;
        if (id) {
            // Edit existing character
            response = await fetch(`${API_URL}/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            // Add new character
            response = await fetch(`${API_URL}/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }

        const result = await response.json();
        if (response.ok) {
            loadCharacters(1);  // Reload characters after saving
            closeModal();  // Close the modal
        } else {
            alert(result.error || 'Error saving character');
        }
    } catch (error) {
        console.error('Error saving character:', error);
    }
});

document.getElementById('editCharacterForm').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent default form submission (page reload)

    const id = document.getElementById('editCharacterId').value; // Get character ID (filled for edit)
    const name = document.getElementById('editName').value;
    const species = document.getElementById('editSpecies').value;
    const description = document.getElementById('editDescription').value;
    const movie_quote = document.getElementById('editMovieQuote').value;

    const data = { name, species, description, movie_quote };

    try {
        // PUT request to update character
        const response = await fetch(`${API_URL}/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            loadCharacters(1);  // Reload characters after updating
            closeEditModal();  // Close the edit modal
        } else {
            alert(result.error || 'Error updating character');
        }
    } catch (error) {
        console.error('Error updating character:', error);
    }
});

