import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {blogsData: {}, isLoading: true}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/:${id}`)
    const data = await response.json()
    const updatedData = {
      title: data.title,
      imageUrl: data.image_url,
      content: data.content,
      avatarUrl: data.avatar_url,
      author: data.author,
    }
    this.setState({blogsData: updatedData, isLoading: false})
  }
  renderBlogItemDetails = () => {
    const {blogsData} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogsData

    return (
      <div className="blog-info">
        <h1 className="blog-title">{title}</h1>
        <div className="author-container">
          <img src={avatarUrl} alt={author} className="author-img" />
          <p className="author">{author}</p>
        </div>
        <img src={imageUrl} className="blog-img" alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }
  render() {
    const {isLoading} = this.state

    return (
      <div className="blog-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" />
          </div>
        ) : (
          this.renderBlogItemDetails()
        )}
      </div>
    )
  }
}
export default BlogItemDetails
