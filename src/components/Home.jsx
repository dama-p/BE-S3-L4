import { useEffect, useState } from "react";
import { baseApiUrl } from "../constants.js";
import { Link } from "react-router-dom/dist";
import Card from "react-bootstrap/Card";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [deletes, setDeletes] = useState(0);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseApiUrl}/posts?page=${currentPage}&_embed=1`)
      .then((res) => {
        setLastPage(parseInt(res.headers.get("X-WP-TotalPages")));
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, [currentPage, deletes]);

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

  const filteredArticles = posts.filter((post) =>
    post.title.rendered.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const deletePost = (postId) => {
    const authString = btoa("wp-react:Mjyv rDpX jX2C iVMo nj3M A4Tm");
    fetch(`${baseApiUrl}/posts/${postId}`, {
      headers: {
        Authorization: `Basic ${authString}`,
      },
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setDeletes(deletes + 1);
        window.alert("Post successfully deleted!");
      }
    });
  };

  return (
    <>
      <Container>
        <Row className="my-5 justify-content-center">
          <Col>
            <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
              Article name
            </Form.Label>
            <Form.Control
              id="inlineFormInputName"
              placeholder="Type your post title here"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Col>
          <Col className="col-1">
            <img src="https://cdn-icons-png.freepik.com/512/251/251116.png" style={{ width: "30px" }} />
          </Col>
        </Row>
        <Row className="justify-content-center">
          {filteredArticles.map((post) => (
            <>
              <Col key={post.id} className="mt-2 d-flex justify-content-center">
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={
                      post._embedded && post._embedded["wp:featuredmedia"]
                        ? post._embedded["wp:featuredmedia"][0].source_url
                        : "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
                    }
                  />

                  <Card.Body className="d-flex flex-column">
                    <Card.Title>
                      {/* <Link to={`/posts/${post.id}`}>{post.title.rendered}</Link> */}
                      {post.title.rendered}
                    </Card.Title>
                    <Card.Text dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></Card.Text>
                    <div className="d-flex justify-content-center mt-auto">
                      <Button variant="info" className="mt-auto mx-1" onClick={() => navigate(`/posts/${post.id}`)}>
                        Details
                      </Button>
                      <Button variant="warning" className="mt-auto mx-1" onClick={() => navigate(`/edit/${post.id}`)}>
                        Edit
                      </Button>
                      <Button variant="danger" className="mt-auto mx-1" onClick={() => deletePost(post.id)}>
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </>
          ))}
        </Row>

        <Row className="mt-4">
          <Col className="d-flex justify-content-center" style={{ cursor: "pointer" }}>
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                  <span className="page-link" onClick={() => currentPage !== 1 && changePage(currentPage - 1)}>
                    Previous
                  </span>
                </li>

                {generatePaginationArray().map((page) => (
                  <li key={page.n} className={`page-item ${page.active && "active"}`}>
                    <span className="page-link" onClick={() => changePage(page.n)}>
                      {page.n}
                    </span>
                  </li>
                ))}

                <li className={`page-item ${currentPage === "lastPage" && "disabled"}`}>
                  <span className="page-link" onClick={() => currentPage !== lastPage && changePage(currentPage + 1)}>
                    Next
                  </span>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
