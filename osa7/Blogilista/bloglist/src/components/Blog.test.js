import React, { Component } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let blog = {
        title: 'Someones test',
        author: 'My favourite',
        url: 'helsinki.fi',
        likes: 3,
        user:{
            name: 'null'
        }
    }

    let comp

    beforeEach(() => {
        comp = render(
            <Blog blog={blog} update={() => void 0} removeThisBlog={() => void 0} />
        )
    })

    test('renders title and author', () => {

        expect(comp.container).toHaveTextContent(
            'Someones test My favourite'
        )
    })

    test('does not render url or likes', () => {
        expect(comp.container).not.toHaveTextContent(
            'helsinki'
        )

        expect(comp.container).not.toHaveTextContent(
            '3'
        )
    })

    test('url and likes visible', () => {
        const button = comp.getByText('view')
        fireEvent.click(button)

        expect(comp.container).toHaveTextContent(
            'helsinki'
        )

        expect(comp.container).toHaveTextContent(
            '3'
        )
    })
})

test('on twice click twice call', () => {
    let blog = {
        title: 'Someones test',
        author: 'My favourite',
        url: 'helsinki.fi',
        likes: 3,
        user:{
            name: 'null'
        }
    }

    const mockFn = jest.fn()

    let comp = render(
        <Blog blog={blog} update={mockFn} removeThisBlog={() => void 0} />
    )

    const viewBtn = comp.getByText('view')
    fireEvent.click(viewBtn)

    const likeBtn = comp.getByText('Like')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(mockFn.mock.calls).toHaveLength(2)
})