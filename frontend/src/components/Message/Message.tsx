import { useEffect, type FC } from "react";
import "./Message.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../redux/slices/messageSlice";


interface MessageProps {}

const Message: FC<MessageProps> = () => {
  const { text, type } = useSelector((state: any) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (text) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [text, dispatch]);

  if (!text) return null;

  return (
    <div
      className="Message"
      style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999 }}
    >
      <Row>
        <Col xs={12}>
     
          <Toast
          
            onClose={() => dispatch(clearMessage())}
            show={!!text}
            // delay={3000}
            // autohide
            className={`bg-${type} text-white`}
                      

          >
            <Toast.Header>
              <strong className="me-auto">עדכון מערכת</strong>
            </Toast.Header>
            <Toast.Body>{text}</Toast.Body>
          </Toast>
        </Col>
      </Row>
    </div>
  );
};

export default Message;
