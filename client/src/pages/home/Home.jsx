import "./home.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { CategoriesSideBar, Pagination, SinglePost } from "../../allPagesPaths";
import Spinner from "../../components/common/spinner/Spinner";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { ToastContainer } from 'react-toastify';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const POST_PER_PAGE = 6;

const Home = () => {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { post, posts, postsCount, loading, isPostDelete } = useSelector((state) => state.post);

  const { profile } = useSelector((state) => state.profile);

  const { categories } = useSelector((state) => state.category);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const pages = Math.ceil(postsCount / POST_PER_PAGE);

  /*===========================================*/

  // get all post based on currentPage and if the post delete state
  useEffect(() => {
    dispatch(getAllPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage, isPostDelete]);

  /*===========================================*/

  // get post count and categories
  useEffect(() => {
    dispatch(getPostsCount());
    dispatch(fetchCategories());
  }, []);

  /*===========================================*/

  //delete post depend on it id
  const Delete = async (id) => {
    dispatch(deletePost(id));
  };

  /*===========================================*/

  // show confirm msg,when need to delete some post
  const handlePostDelete = async (id) => {
    confirmAlert({
      message: "Are you sure you want to delete this post?",
      buttons: [{
        label: 'Yes',
        onClick: () => Delete(id)
      },
      { label: 'No' }
      ]
    });
  }

  /*===========================================*/

  if (loading) return <Spinner />;
  return (
    <>
      <div className="home" style={{ marginTop: "110px" }}>
        <ToastContainer autoClose={6000} />
        <div className="container-fluid">
          <div className="home-content d-flex  gap-2 flex-wrap">
            <div className="single-posts-box">
              {
                posts.length > 0
                  ?
                  posts?.map(post => (
                    <SinglePost
                      post={post}
                      key={post._id}
                      userInLocalStorage={user}
                      profile={profile}
                      onPostDelete={handlePostDelete}
                    />
                  ))
                  :
                  <>
                    <h2 className="text-capitalize">no post yet </h2>
                  </>
              }
            </div>
            <CategoriesSideBar categories={categories} />
          </div>
          {
            posts.length > 0 &&
            <Pagination
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          } 
        </div>

      </div>
    </>
  )
}

export default Home;