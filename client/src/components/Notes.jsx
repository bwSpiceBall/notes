import React, { useState, useEffect } from 'react';
import { Button, Card, InputGroup } from 'react-bootstrap';

const defaultNote = {
    title: '',
    text: '',
}

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [newNote, updateNewNote] = useState(null)

    useEffect(() => {
        async function fetchNotes() {
            const response = await fetch('http://localhost:3000/notes');
            const data = await response.json();
            console.log(data);
            setNotes(data);
        }
        fetchNotes();
    }, []);

    async function handleAddNote({text, title}) {
        console.log('text, title', text, title);
        
        const response = await fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, note_text: text }),
        });
        const newNote = await response.json();
        setNotes([...notes, newNote]);
        updateNewNote(null)
    }

    async function handleDeleteNote(id) {
        await fetch(`http://localhost:3000/notes/${id}`, {
            method: 'DELETE',
        });
        setNotes(notes.filter((note) => note.id !== id));
    }


    return (
        <div style={{ padding: '1rem' }}>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                }}
            >
                {notes.map((note) => (
                    <Card key={note.id} style={{ width: '18rem', margin: '1rem' }}>
                        <Card.Body>
                            <Card.Title>{note.title}</Card.Title>
                            <Card.Text>{note.note_text}</Card.Text>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button onClick={() => handleDeleteNote(note.id)} variant="danger">
                                    Delete
                                </Button>
                                <Button variant="primary">Edit</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <Button variant="success" size="lg" onClick={() => updateNewNote(defaultNote)}>
                    Add Note
                </Button>
            </div>
            {newNote && (
                <Card style={{ marginBottom: '1rem' }}>
                    <Card.Body>
                        <InputGroup>
                            <InputGroup.Text>Title:</InputGroup.Text>
                            <input
                                type="text"
                                className="form-control"
                                value={newNote.title}
                                onChange={(e) =>
                                    updateNewNote({ ...newNote, title: e.target.value })
                                }
                            />
                        </InputGroup>
                        <InputGroup style={{ marginTop: '1rem' }}>
                            <InputGroup.Text>Text:</InputGroup.Text>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={newNote.text}
                                onChange={(e) =>
                                    updateNewNote({ ...newNote, text: e.target.value })
                                }
                            />
                        </InputGroup>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '1rem',
                            }}
                        >
                            <Button variant="danger" onClick={() => updateNewNote(null)}>
                                Cancel
                            </Button>
                            <Button variant="success" onClick={() => handleAddNote(newNote)}>
                                Add
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}
