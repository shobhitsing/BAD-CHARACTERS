import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './App.css';
import SearchField from "react-search-field";


function App() {
  const [postsPerPage] = useState(9);
  const [offset, setOffset] = useState(1);
  const [posts, setAllPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0)



  const getPostData = (data) => {
    return (


      data.map(post => <div className="data" >
        <div className="cards">
          <div className="card">
            <img className="card__img" src={post.img} alt="Card image cap" />
            <div className="card__info">
              <h3 className="card__info">{post.name}</h3>
              <h3 className="card__info">{post.birthday}</h3>
              <h3 className="card__category"> {post.occupation}</h3>
              <h3 className="card__category">{post.status}</h3>

            </div>
          </div>
        </div>
      </div>)

    )
  }

  const getAllPosts = async () => {
    const res = await axios.get("https://breakingbadapi.com/api/characters")
    const data = res.data;
    const slice = data.slice(offset - 1, offset - 1 + postsPerPage)

    const postData = getPostData(slice)


    setAllPosts(postData)
    setPageCount(Math.ceil(data.length / postsPerPage))
  }

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1)
  };

  useEffect(() => {
    getAllPosts()
  }, [offset])



  return (
    <div className="main-app">
      <h2 className="heading_style">bad characters</h2>




      {posts}


      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"} />
    </div>
  );
}

export default App;