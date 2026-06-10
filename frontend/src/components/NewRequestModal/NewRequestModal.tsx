import type { FC } from 'react';
import './NewRequestModal.scss';
import { Form, Button, Card, Container, Col, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
// מייבאים את שני מערכי המילים הפשוטים והטיפוסים מהמודל
import { 
  requestStatuses, 
  priorityOptions, 
  type HelpRequest, 
  type RequestStatusType, 
  type PriorityType 
} from '../../models/helpRequest.model';

interface NewRequestModalProps {}

const NewRequestModal: FC<NewRequestModalProps> = () => {

  // יוצרים טיפוס מותאם לטופס שמקבל זמנית ערך ריק בתחילת הדרך בשביל הבחירה
  interface FormValues extends Omit<HelpRequest, '_id' | 'status' | 'priority'> {
    status: RequestStatusType | '';
    priority: PriorityType | '';
  }

  const myForm = useFormik<FormValues>({
    initialValues: {
      location: { areaCode: '', name: '' },
      problemDescription: '',
      contactPhone: '',
      status: '', // מתחיל ריק כדי לאלץ בחירה
      peopleStuck: 1,
      priority: '', // מתחיל ריק כדי לאלץ בחירה (מילה, לא מספר!)
      volunteerCode: '',
    },
    validationSchema: yup.object().shape({
      location: yup.object().shape({
        areaCode: yup
          .number()
          .transform((value, originalValue) => (originalValue === '' ? undefined : value))
          .required('שדה חובה'),
        name: yup.string().required('שדה חובה'),
      }),
      problemDescription: yup.string().required('שדה חובה'),
      contactPhone: yup
        .string()
        .required('שדה חובה')
        .matches(/^[0-9+\- ]+$/, 'טלפון לא תקין'),
      status: yup
        .string()
        .oneOf([...requestStatuses], 'סטטוס לא תקין') // שימוש במערך הפשוט מהמודל
        .required('שדה חובה'),
      peopleStuck: yup
        .number()
        .min(1, 'חייב להיות לפחות 1 איש')
        .required('שדה חובה'),
      priority: yup
        .string() // שינוי ל-string כי זו מילה עכשיו!
        .oneOf([...priorityOptions], 'עדיפות לא תקינה') // שימוש במערך הפשוט מהמודל
        .required('שדה חובה'),
      volunteerCode: yup.string().nullable(),
    }),
    onSubmit: (values) => {
      alert('קריאה חדשה נרשמה בהצלחה!');
      console.log('New request payload:', values);
    },
  });

  return (
    <div className="NewRequestModal">
      <Container className="mt-5">
        <Card className="shadow-sm p-4 bg-light m-auto" style={{ maxWidth: '650px' }}>
          <h3 className="mb-4 text-center">הוספת קריאה חדשה</h3>
          <Form noValidate onSubmit={myForm.handleSubmit}>
            
            {/* מיקום ושם מקום מאוחדים לשורה אחת יפה */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="location.name">
                  <Form.Label>שם המקום</Form.Label>
                  <Form.Control
                    type="text"
                    name="location.name"
                    value={myForm.values.location.name}
                    onChange={myForm.handleChange}
                    onBlur={myForm.handleBlur}
                    placeholder="שם המקום"
                    isInvalid={!!(myForm.touched.location?.name && myForm.errors.location?.name)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {myForm.errors.location?.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="location.areaCode">
                  <Form.Label>קוד אזור</Form.Label>
                  <Form.Control
                    type="number"
                    name="location.areaCode"
                    value={myForm.values.location.areaCode}
                    onChange={myForm.handleChange}
                    onBlur={myForm.handleBlur}
                    placeholder="קוד אזור"
                    isInvalid={!!(myForm.touched.location?.areaCode && myForm.errors.location?.areaCode)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {myForm.errors.location?.areaCode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="contactPhone">
                  <Form.Label>טלפון ליצירת קשר</Form.Label>
                  <Form.Control
                    type="tel"
                    name="contactPhone"
                    value={myForm.values.contactPhone}
                    onChange={myForm.handleChange}
                    onBlur={myForm.handleBlur}
                    placeholder="טלפון"
                    isInvalid={!!(myForm.touched.contactPhone && myForm.errors.contactPhone)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {myForm.errors.contactPhone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="problemDescription">
              <Form.Label>תיאור הבעיה</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="problemDescription"
                value={myForm.values.problemDescription}
                onChange={myForm.handleChange}
                onBlur={myForm.handleBlur}
                placeholder="תאר את הבעיה "
                isInvalid={!!(myForm.touched.problemDescription && myForm.errors.problemDescription)}
              />
              <Form.Control.Feedback type="invalid">
                {myForm.errors.problemDescription}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="status">
                  <Form.Label>סטטוס</Form.Label>
                  <Form.Select
                    name="status"
                    value={myForm.values.status}
                    onChange={myForm.handleChange}
                    onBlur={myForm.handleBlur}
                    isInvalid={!!(myForm.touched.status && myForm.errors.status)}
                  >
                    <option value="">בחר סטטוס</option>
                    {requestStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status} {/* מציג פשוט את המילה הגולמית מהמערך */}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {myForm.errors.status}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="peopleStuck">
                  <Form.Label>מספר אנשים</Form.Label>
                  <Form.Control
                    type="number"
                    name="peopleStuck"
                    value={myForm.values.peopleStuck}
                    onChange={myForm.handleChange}
                    onBlur={myForm.handleBlur}
                    placeholder="מספר אנשים"
                    isInvalid={!!(myForm.touched.peopleStuck && myForm.errors.peopleStuck)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {myForm.errors.peopleStuck}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="priority">
                  <Form.Label>דחיפות</Form.Label>
                  <Form.Select
                    name="priority"
                    value={myForm.values.priority}
                    onChange={myForm.handleChange} // פשוט ורגיל, בלי המרה למספר
                    onBlur={myForm.handleBlur}
                    isInvalid={!!(myForm.touched.priority && myForm.errors.priority)}
                  >
                    <option value="">בחר דחיפות</option>
                    {priorityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option} {/* מציג פשוט את המילה הגולמית מהמערך */}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {myForm.errors.priority}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              שמירת קריאה
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default NewRequestModal;