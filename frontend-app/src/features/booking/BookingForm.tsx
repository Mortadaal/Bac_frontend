
import { Segment, Form, Input, Button, Label } from 'semantic-ui-react';

export default function BookingForm(){
  return (
    <Segment>
      <Form >
        <Form.Field>
          <Label>Rum:</Label>
          <Input
            type="number"
            name="roomNr"
           
            required
          />
        </Form.Field>
        <Form.Field>
          <Label>Dato For Booking:</Label>
          <Input
            type="date"
            name="bookingDate"
            
            required
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Field>
            <Label>Bookning Start :</Label>
            <Input
              type="time"
              name="startTime"
              min='16:00'
            max='00:00'
              required
            />
          </Form.Field>
          <Form.Field>
            <Label>Bookning Slut:</Label>
            <Input
              type="time"
              name="endTime"
            min='17:15'
            max='02:00'
              required
            />
          </Form.Field>
        </Form.Group>
        <Button type="submit">Book Nu</Button>
      </Form>
    </Segment>
  )
}


