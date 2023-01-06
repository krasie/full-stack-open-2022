const NewBlogForm = (props) => (
  <div>
    <h1>New Blog</h1>
    <form onSubmit={props.handleSubmit}>
      <div>
        <div>
          title:<input type="text" 
                  name="title" 
                  value={props.title} 
                  onChange={props.handleTitleChange}/>
        </div>
        <div>
          author:<input type="text" 
                  name="author" 
                  value={props.author}
                  onChange={props.handleAuthorChange}/>
        </div>
        <div>
          url:<input type="text" 
                  name="url" 
                  value={props.url}
                  onChange={props.handleUrlChange}/>
        </div>
        <button type="submit">Create Blog</button>
      </div>
    </form>
  
  </div>
  )
export default NewBlogForm