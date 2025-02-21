/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import PropTypes from 'prop-types'
import {format} from 'date-fns'
import {Link} from 'react-router-dom'
const Posts = ({_id,title,content,author,summary,cover,createdAt}) => {
  return (
    <div className="post">
      <Link to={`/posts/${_id}`}>
        <div className="postImage"><img src={'http://localhost:4000/'+cover}  alt=""/>
        </div>
      </Link>
      <div>
        <h1 className="postTitle">
          <Link to={`/posts/${_id}`}>
          {title}
          </Link>
        </h1>
        <p className="author">{author.username} , {format(new Date(createdAt), 'PP')}</p>
        <p className="description">
          {summary} 
        </p>
      </div>
    </div>
  )
}

// Posts.propTypes = {
//   title: PropTypes.string.isRequired,
//   content: PropTypes.string.isRequired,
//   author: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//   }).isRequired,
//   summary: PropTypes.string.isRequired,
//   cover: PropTypes.string.isRequired,
// };

export default Posts