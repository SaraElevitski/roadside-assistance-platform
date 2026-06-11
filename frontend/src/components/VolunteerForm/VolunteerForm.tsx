import { useState, type FC } from "react";
import "./VolunteerForm.scss";
import { Form, Button, Card, Container, Col, Row } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import type { Volunteer } from "../../models/volunteers.model";
import volunteersService from "../../services/volunteers.service";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../../redux/slices/userSlice";

interface VolunteerFormProps {
  isEdit: boolean;
  volunteer?: Volunteer;
}

const VolunteerForm: FC<VolunteerFormProps> = ({ isEdit, volunteer }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState<boolean>(isEdit);
  const user = useSelector((state: any) => state.user.user?.data);

  const validateIsraeliId = (id: string | number): boolean => {
    const strId = String(id).trim();
    if (!strId || strId.length > 9 || isNaN(Number(strId))) return false;

    const paddedId = strId.padStart(9, "0");

    const sum = paddedId.split("").reduce((acc, digit, index) => {
      const num = Number(digit);
      const weight = index % 2 === 0 ? 1 : 2;
      let stepResult = num * weight;

      if (stepResult > 9) {
        stepResult = Math.floor(stepResult / 10) + (stepResult % 10);
      }

      return acc + stepResult;
    }, 0);

    return sum % 10 === 0;
  };

  const myForm = useFormik<Omit<Volunteer, "_id">>({
    initialValues: volunteer || {
      firstName: "",
      lastName: "",
      tz: "",
      email: "",
      phone: "",
      specialties: [],
    },
    onSubmit: async (value) => {
      if (!editMode) {
        const v = await volunteersService.createVolunteer(value);
        alert(`המתנדב נשמר בהצלחה הקוד הוא: ${v.data.data._id}`);
      } else {
        console.log(`  ${value.email} 'המייל הוא`)
        const v = await volunteersService.updateVolunteer(user._id, value);
        alert(`הפרטים  עודכנו בהצלחה , תזכורת! הקוד הוא: ${v.data.data._id}`);
        dispatch(userDetails(v.data));
      }
    },

    validationSchema: yup.object().shape({
      firstName: yup.string().required("שדה חובה"),
      lastName: yup.string().required("שדה חובה"),
      tz: yup
        .string()
        .test("is-valid-id", "מספר תעודת הזהות אינו תקין", (value) => {
          return validateIsraeliId(value || "");
        }),
      email: yup
        .string()
        .email("כתובת האימייל אינה תקינה")
        .required("שדה חובה"),
      phone: yup
        .string()
        .required("שדה חובה")
        .matches(/^[0-9+\- ]+$/, "טלפון לא תקין"),
    }),
  });

  return (
    <div className="VolunteerForm">
      <Container className="mt-5">
        <Card
          className="shadow-sm p-4 bg-light m-auto"
          style={{ maxWidth: "550px" }}
        >
          <h3 className="mb-4 text-center">{editMode ? "עדכון פרטים " : "מתנדב חדש"} </h3>
          <Form onSubmit={myForm.handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>שם פרטי</Form.Label>
                  <Form.Control
                    onChange={myForm.handleChange}
                    onBlur={myForm.handleBlur}
                    value={myForm.values.firstName}
                    name="firstName"
                    type="text"
                    placeholder="שם פרטי"
                    isInvalid={
                      !!(myForm.touched.firstName && myForm.errors.firstName)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {myForm.errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>שם משפחה</Form.Label>
                  <Form.Control
                    onChange={myForm.handleChange}
                    onBlur={myForm.handleBlur}
                    value={myForm.values.lastName}
                    name="lastName"
                    type="text"
                    placeholder="שם משפחה"
                    isInvalid={
                      !!(myForm.touched.lastName && myForm.errors.lastName)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {myForm.errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>אימייל</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={myForm.handleChange}
                onBlur={myForm.handleBlur}
                value={myForm.values.email}
                name="email"
                isInvalid={!!(myForm.touched.email && myForm.errors.email)}
              />
              <Form.Control.Feedback type="invalid">
                {myForm.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>טלפון</Form.Label>
                  <Form.Control
                    type="tel"
                    onChange={myForm.handleChange}
                    onBlur={myForm.handleBlur}
                    value={myForm.values.phone}
                    name="phone"
                    isInvalid={!!(myForm.touched.phone && myForm.errors.phone)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {myForm.errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>תעודת זהות</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={myForm.handleChange}
                    onBlur={myForm.handleBlur}
                    value={myForm.values.tz}
                    name="tz"
                    isInvalid={!!(myForm.touched.tz && myForm.errors.tz)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {myForm.errors.tz}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label> התמחויות</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {isEdit ? "עדכון הנתונים" : "שמירה"}
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default VolunteerForm;
