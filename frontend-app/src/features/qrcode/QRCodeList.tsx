import QRCode from 'qrcode.react';
import { useState } from 'react';
import { Card, Container, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

interface QRCodeGeneratorProps {
  initialNumberOfCodes: number;
}

export default function QRCodeList({ initialNumberOfCodes }: QRCodeGeneratorProps) {
  const navigate = useNavigate(); // Initialize navigate from react-router-dom
  const [numberOfCodes, setNumberOfCodes] = useState(initialNumberOfCodes);

  const generateQRCodeArray = (count: number) => {
    const qrCodes = [];

    for (let i = 1; i <= count; i++) {
      qrCodes.push(
        <Card key={i} onClick={() => handleQRCodeClick(i)}>
          <Card.Content>
            <Card.Header>Table {i}</Card.Header>
            <Card.Description>
              <QRCode value={`Table ${i}`} size={128} />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              primary
              as="a"
              href={`data:image/png;base64,${generateBase64QRCode(`Table ${i}`)}`}
              download={`qrcode_table_${i}.png`}
            >
              Download QR Code
            </Button>
          </Card.Content>
        </Card>
      );
    }

    return qrCodes;
  };

  const generateBase64QRCode = (_text: string) => {
    const base64ImagePlaceholder = 'base64-encoded-image-data';
    return base64ImagePlaceholder;
  };

  const handleAddQRCode = () => {
    setNumberOfCodes((prev) => prev + 1);
  };

  const handleRemoveQRCode = () => {
    if (numberOfCodes > 0) {
      setNumberOfCodes((prev) => prev - 1);
    }
  };

  const handleQRCodeClick = (tableNumber: number) => {
    // Redirect to the specified route when a QR code is clicked
    navigate(`/menu/${tableNumber}`);
  };

  return (
    <Container>
      <div>
        <Button primary onClick={handleAddQRCode}>
          Add QR Code
        </Button>
        <Button secondary onClick={handleRemoveQRCode}>
          Remove QR Code
        </Button>
      </div>
      <Card.Group>{generateQRCodeArray(numberOfCodes)}</Card.Group>
    </Container>
  );
}
