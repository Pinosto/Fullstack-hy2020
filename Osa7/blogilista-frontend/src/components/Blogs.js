import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

const Blogs=() => {
  const blogs = useSelector(state => state.blogs)
  const history = useHistory()

  const handleClick = ( id ) => () => (history.push(`/blog/id/${id}`))
  return (
    <div>
      <Table hover>
        <tbody>

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <tr key={blog.id} onClick={handleClick(blog.id)}>
                <td>
                  <Link to={`/blog/id/${blog.id}`}>
                    {blog.title}
                  </Link>
                </td>
              </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs
