import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = async () => {
  const request = await axios.get(baseUrl) 
  const data = request.data
  data.forEach(e => {
    e.visible=false
  });
  data.sort((a, b) => {
    if(a.likes < b.likes){
      return 1
    }
    if(a.likes > b.likes){
      return -1
    }
    return 0
  }
)
  return data
}

const create = async(blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl,blog,config)
  return response.data
}

const update = async(blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = baseUrl + '/' + blog.id
  const response = await axios.put(url,blog,config)
  return response
}

const deleteBlog = async(blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = baseUrl + '/' + blogId
  const response = await axios.delete(url,config)
  return response
}


export default { getAll,create,setToken,update,deleteBlog }
