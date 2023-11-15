import QRCode from 'qrcode.react';
import { useState, useEffect } from 'react';
import { Card, Container, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

interface QRCodeGeneratorProps {
  initialNumberOfCodes: number;
}

interface QRCodeData {
  id: number;
  url: string;
}

export default function QRCodeList({ initialNumberOfCodes }: QRCodeGeneratorProps) {
  const navigate = useNavigate();
  const [numberOfCodes, setNumberOfCodes] = useState(initialNumberOfCodes);
  const [qrCodeDataArray, setQRCodeDataArray] = useState<QRCodeData[]>([]);

  useEffect(() => {
    setQRCodeDataArray(generateQRCodeDataArray(numberOfCodes));
  }, [numberOfCodes]);

  const generateQRCodeDataArray = (count: number): QRCodeData[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      url: `${window.location.origin}/menu/${i + 1}`,
    }));
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
      <Card.Group>
        {qrCodeDataArray.map((qrCodeData) => (
          <Card key={qrCodeData.id} onClick={() => handleQRCodeClick(qrCodeData.id)}>
            <Card.Content>
              <Card.Header>Table {qrCodeData.id}</Card.Header>
              <Card.Description>
                <QRCode value={qrCodeData.url} size={128} />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button
                primary
                as="a"
                href={`data:image/png;base64,${generateBase64QRCode(`Table ${qrCodeData.id}`)}`}
                download={`qrcode_table_${qrCodeData.id}.png`}
              >
                Download QR Code
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}
