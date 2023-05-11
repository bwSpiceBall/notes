import React from 'react';

function App() {
    // Handler for adding a new note
    async function handleAddNote() {
        const response = await fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ note_text: 'New note' }),
        });
        const newNote = await response.json();
        setNotes([...notes, newNote]);
    }

    return (
        <>
            <button onClick={handleAddNote}>Add Note</button>
        </>
    );
}

export default App;
