import QRCode from "qrcode.react";
import { useState, useEffect } from "react";
import { Card, Button, Segment, Grid, Item } from "semantic-ui-react";

interface QRCodeGeneratorProps {
  initialNumberOfCodes: number;
}

interface QRCodeData {
  id: number;
  url: string;
}

export default function QRCodeList({
  initialNumberOfCodes,
}: QRCodeGeneratorProps) {
  const [numberOfCodes, setNumberOfCodes] = useState(initialNumberOfCodes);
  const [qrCodeDataArray, setQRCodeDataArray] = useState<QRCodeData[]>([]);

  useEffect(() => {
    setQRCodeDataArray(generateQRCodeDataArray(numberOfCodes));
  }, [numberOfCodes]);

  const generateQRCodeDataArray = (count: number): QRCodeData[] => {
    return Array.from({ length: count }, (_, i) => {
      const tableNumber = i + 1;
      const qrCodeData: QRCodeData = {
        id: tableNumber,
        url: `${window.location.origin}/?tablenumber=${tableNumber}`,
      };
      return qrCodeData;
    });
  };

  const handleAddQRCode = () => {
    setNumberOfCodes((prev) => prev + 1);
  };

  const handleRemoveQRCode = () => {
    if (numberOfCodes > 0) {
      setNumberOfCodes((prev) => prev - 1);
    }
  };

  return (
    <Segment>
      <Grid stackable columns={2}>
        <Grid.Column>
          <Button.Group>
            <Button
              primary
              onClick={handleAddQRCode}
              content="Add QR Code"
            ></Button>
            <Button.Or />
            <Button
              secondary
              onClick={handleRemoveQRCode}
              content="Remove QR Code"
            ></Button>
          </Button.Group>
        </Grid.Column>
        <Item>
          <Item.Content>
            <Card.Group>
              {qrCodeDataArray.map((qrCodeData) => (
                <Card>
                  <Card.Content>
                    <Card.Header style={{ textAlign: "center" }}>
                      Table {qrCodeData.id}
                    </Card.Header>
                    <Card.Description>
                      <QRCode value={qrCodeData.url} size={250} />
                    </Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </Item.Content>
        </Item>
      </Grid>
    </Segment>
  );
}
