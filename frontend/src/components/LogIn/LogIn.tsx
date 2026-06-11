import type { FC } from "react";
import "./LogIn.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form, Button, Card, Container } from "react-bootstrap";
import volunteersService from "../../services/volunteers.service";
import { useDispatch } from "react-redux";
import { userDetails } from "../../redux/slices/userSlice";

interface LogInProps {}

const LogIn: FC<LogInProps> = () => {
  const dispatch = useDispatch();

  const myForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (value: any) => {
      try {
        const res = await volunteersService.loginVolunteer(value);
        if (res) {
          alert("הכניסה בוצעה!");
          dispatch(userDetails(res.data));
        }
      } catch (error: any) {
        alert("המשתמש לא נמצא הרשם");
      }
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("כתובת האימייל אינה תקינה")
        .required("שדה חובה"),
      password: yup.string().required("חובה סיסמא"),
    }),
  });

  return (
    <div className="LogIn">
      <Container>
        <Card
          className="shadow-sm p-4 bg-light m-auto mt-5"
          style={{ maxWidth: "550px" }}
        >
          <h3 className="mb-4 text-center">כניסה</h3>
          <Form onSubmit={myForm.handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>אימייל</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={myForm.handleChange}
                onBlur={myForm.handleBlur}
                name="email"
                isInvalid={!!(myForm.touched.email && myForm.errors.email)}
              />
              <Form.Control.Feedback type="invalid">
                {myForm.errors.email as string}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>סיסמא</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                onChange={myForm.handleChange}
                onBlur={myForm.handleBlur}
                name="password"
                isInvalid={
                  !!(myForm.touched.password && myForm.errors.password)
                }
              />
              <Form.Control.Feedback type="invalid">
                {myForm.errors.password as string}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              שמירה
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default LogIn;
