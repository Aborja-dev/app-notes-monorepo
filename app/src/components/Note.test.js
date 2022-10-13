import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import Note from './Note'

test('renders content',()=>{
    const note = {
        content:'note for test',
        important: true
    }
    const mockHandler = jest.fn()
    const view = render(<Note note={note} toggleImportance={mockHandler}/>)
    const button = view.getByText('make not important')
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
     
}) 
