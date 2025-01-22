'use client'

import React, { useState, useEffect } from 'react'

export default function Page() {
	const [notes, setNotes] = useState([])
	const [edit, setEdit] = useState(null)

	useEffect(() => {
		const savedNotes = localStorage.getItem('notes')
		if (savedNotes) {
			setNotes(JSON.parse(savedNotes))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes))
	}, [notes])

	function handleSubmit(e) {
		e.preventDefault()
		const title = e.target.title.value
		const description = e.target.description.value

		if (edit) {
			const updatedData = notes.map(note =>
				note.id === edit.id ? { id: note.id, title, description } : note,
			)

			setNotes(updatedData)
			setEdit(null)
			e.target.reset()
			return
		}

		setNotes(prev => [...prev, { id: Date.now(), title, description }])
		e.target.reset()
	}

	function handleDelete(id) {
		const noteDelete = notes.filter(n => n.id !== id)
		setNotes(noteDelete)
	}

	function handleEdit(id) {
		const noteEdit = notes.find(n => n.id === id)
		setEdit(noteEdit)
	}

	return (
		<div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center p-6">
			<div className="max-w-6xl w-full bg-white p-8 rounded-xl shadow-2xl flex space-x-12">
				<div className="w-1/3 space-y-6">
					<h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
						Note Taking App
					</h1>
					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="text"
							placeholder="Title"
							name="title"
							defaultValue={edit?.title || ''}
							className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50 transition-all duration-300 shadow-sm"
							required
						/>
						<textarea
							placeholder="Description"
							name="description"
							defaultValue={edit?.description || ''}
							className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-36 resize-none bg-indigo-50 transition-all duration-300 shadow-sm"
							required
						/>
						<button
							type="submit"
							className={`w-full py-3 text-lg text-white rounded-lg transition-all duration-300 transform shadow-md ${
								edit
									? 'bg-blue-600 hover:bg-blue-700'
									: 'bg-purple-600 hover:bg-purple-700'
							}`}
						>
							{edit ? 'Update Note' : 'Add Note'}
						</button>
					</form>
				</div>

				<div className="w-2/3">
					<h2 className="text-3xl font-bold text-center text-gray-800 bg-gray-100 py-4 rounded-lg mb-6 shadow-md">
						Your Notes
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{notes.map(note => (
							<div
								key={note.id}
								className="p-6 bg-white rounded-lg shadow-lg border-l-4 border-purple-600"
							>
								<h3 className="text-lg font-bold text-purple-600 mb-2">
									{note.title}
								</h3>
								<p className="text-gray-700 text-sm mb-4">{note.description}</p>
								<div className="flex justify-between">
									<button
										className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
										onClick={() => handleDelete(note.id)}
									>
										Delete
									</button>
									<button
										className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
										onClick={() => handleEdit(note.id)}
									>
										Edit
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
