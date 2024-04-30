import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";
import { baseApiUrl } from "../constants";

const PostDetails = () => {
  const [post, setPost] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${baseApiUrl}/posts/${id}?_embed=1`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      });
  }, [id]);

  return (
    post && (
      <>
        <Container className="mt-4">
          <Row className="d-flex flex-column align-items-center">
            <Col className="col-12 col-md-10">
              <h2>{post.title.rendered}</h2>
              <h5>Author: {post._embedded["author"][0].name}</h5>
            </Col>
            <Col className="col-12 col-md-10 mb-2">
              {post._embedded["wp:term"] && (
                <div>
                  {post._embedded["wp:term"][0].map((category) => (
                    <span key={category.id} className="badge rounded-pill text-bg-primary">
                      {category.name}
                    </span>
                  ))}
                </div>
              )}
            </Col>

            <Col className="col-12 col-md-10">
              <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
            </Col>
          </Row>
        </Container>
      </>
    )
  );
};

export default PostDetails;
