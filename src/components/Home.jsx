import { useEffect, useState } from 'react';
import { baseApiUrl } from '../constants.js';
import { Link } from 'react-router-dom/dist';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [lastPage, setLastPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch(`${baseApiUrl}/posts?page=${currentPage}`)
            .then((res) => {
               
                setLastPage(parseInt(res.headers.get('X-WP-TotalPages')));
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setPosts(data);
            });
    }, [currentPage]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    function generatePaginationArray() {
        let paginationArr = [];
        for (let index = 1; index <= lastPage; index++) {
            paginationArr.push({
                n: index,
                active: currentPage === index,
            });
        }
        return paginationArr;

    }

    return (
        <>
            
                {posts.map((post) => (
                    <>
                        <Link to={`/posts/${post.id}`} key={post.id}>
                            {post.title.rendered}
                        </Link>
                        <div  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}  ></div>
                    </>
                ))}
            

            <nav>
                <ul className="pagination">
                    <li
                        className={`page-item ${
                            currentPage === 1 && 'disabled'
                        }`}
                    >
                        <span
                            className="page-link"
                            onClick={() =>
                                currentPage !== 1 && changePage(currentPage - 1)
                            }
                        >
                            Previous
                        </span>
                    </li>

                    {generatePaginationArray().map((page) => (
                        <li
                            key={page.n}
                            className={`page-item ${page.active && 'active'}`}
                        >
                            <span
                                className="page-link"
                                onClick={() => changePage(page.n)}
                            >
                                {page.n}
                            </span>
                        </li>
                    ))}

                    <li
                        className={`page-item ${
                            currentPage === 'lastPage' && 'disabled'
                        }`}
                    >
                        <span
                            className="page-link"
                            onClick={() =>
                                currentPage !== lastPage &&
                                changePage(currentPage + 1)
                            }
                        >
                            Next
                        </span>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Home;
