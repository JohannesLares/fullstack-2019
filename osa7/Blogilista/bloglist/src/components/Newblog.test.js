import React, { Component } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Newblog from './Newblog'

test('creating new blog creates with correct data', () => {
    const createBlog = jest.fn()

    const comp = render(
        <Newblog newBlog={createBlog} />
    )

    const titleInp = comp.container.querySelector('input[name="title"]')
    const authorInp = comp.container.querySelector('input[name="author"]')
    const urlInp = comp.container.querySelector('input[name="url"]')

    const form = comp.container.querySelector('form')

    fireEvent.change(titleInp, {target: { value: 'Uusi blogi'}})
    fireEvent.change(authorInp, {target: { value: 'kirjoittaja'}})
    fireEvent.change(urlInp, {target: { value: 'helsinki.fi'}})

    fireEvent.submit(form)
    
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Uusi blogi')
    expect(createBlog.mock.calls[0][0].author).toBe('kirjoittaja')
    expect(createBlog.mock.calls[0][0].url).toBe('helsinki.fi')
})