const Blog = (props) => {
  const blogStyle = {
    border: '1px solid black',
    padding: '10px',
    margin: '10px 0', 
  }
  const buttonShow  = props.blog.visible ? 'show' : 'hide';
  const visible = {
    display: props.blog.visible? '' : 'none',
  }
  return(
  <div style={blogStyle}>
    <div>{props.blog.title} <button onClick={props.handleBlogVisible} value={props.blog.id}>{buttonShow}</button></div>
    <div style={visible}>
      <div>{props.blog.url}</div>
      <div>{props.blog.likes} <button>like</button></div>
      <div>{props.blog.author}</div>
    </div>
  </div>  
)}

export default Blog