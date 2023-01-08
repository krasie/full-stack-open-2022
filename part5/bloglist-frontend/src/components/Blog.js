const Blog = (props) => {
  const blogStyle = {
    border: '1px solid black',
    padding: '10px',
    margin: '10px 0', 
  }
  const buttonShow  = !props.blog.visible ? 'show' : 'hide';
  const blogUser = props.blog?.user
  let deleteBottonShow = false

  if(props.loginUser && blogUser){
    deleteBottonShow = blogUser?.id === props.loginUser
  }
  
  const visible = {
    display: props.blog.visible? '' : 'none',
  }
  const delelteBottonnVisible = {
    display: deleteBottonShow? '' : 'none',
  }
  return(
  <div style={blogStyle}>
    <div>{props.blog.title} <button onClick={props.handleBlogVisible} value={props.blog.id}>{buttonShow}</button></div>
    <div style={visible}>
      <div>{props.blog.url}</div>
      <div>{props.blog.likes} <button onClick={props.handleLike} value={props.blog.id}>like</button></div>
      <div>{props.blog.author}</div>
      <div><button onClick={props.handleDeleteBlog} value={props.blog.id} style={delelteBottonnVisible}>delete</button></div>
    </div>
  </div>  
)}

export default Blog