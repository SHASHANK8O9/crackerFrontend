// emails/OrderConfirmation.tsx
import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Heading,
    Text,
    Hr,
    Column,
    Row,
    Img,
} from '@react-email/components';

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface OrderConfirmationProps {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
    orderItems: OrderItem[];
}

export const OrderConfirmation: React.FC<Readonly<OrderConfirmationProps>> = ({
    fullName,
    email,
    phone,
    address,
    notes,
    orderItems,
}) => {
    const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <Html>
            <Head />
            <Preview>Your Order Confirmation</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Heading style={heading}>Order Confirmation</Heading>
                        <Text style={subHeading}>Thank you for your order, {fullName}!</Text>
                    </Section>

                    <Section style={section}>
                        <Heading as="h2" style={sectionHeading}>
                            Customer Information
                        </Heading>
                        <Row>
                            <Column>
                                <Text style={label}>Full Name:</Text>
                                <Text style={value}>{fullName}</Text>
                            </Column>
                            <Column>
                                <Text style={label}>Email:</Text>
                                <Text style={value}>{email}</Text>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Text style={label}>Phone:</Text>
                                <Text style={value}>{phone}</Text>
                            </Column>
                            <Column>
                                <Text style={label}>Address:</Text>
                                <Text style={value}>{address}</Text>
                            </Column>
                        </Row>
                        {notes && (
                            <Row>
                                <Column>
                                    <Text style={label}>Notes:</Text>
                                    <Text style={value}>{notes}</Text>
                                </Column>
                            </Row>
                        )}
                    </Section>

                    <Hr style={divider} />

                    <Section style={section}>
                        <Heading as="h2" style={sectionHeading}>
                            Order Items
                        </Heading>
                        {orderItems.map((item) => (
                            <Row key={item.id} style={itemRow}>
                                <Column style={itemImageCol}>
                                    <Img
                                        src={item.image}
                                        alt={item.name}
                                        width="40"
                                        height="40"
                                        style={itemImage}
                                    />
                                </Column>
                                <Column style={itemDetailsCol}>
                                    <Text style={itemName}>{item.name}</Text>
                                    <Text style={itemPrice}>${item.price.toFixed(2)}</Text>
                                    <Text style={itemQuantity}>Qty: {item.quantity}</Text>
                                </Column>
                                <Column style={itemTotalCol}>
                                    <Text style={itemTotal}>
                                        Rs.{(item.price * item.quantity).toFixed(2)}
                                    </Text>
                                </Column>
                            </Row>
                        ))}
                    </Section>

                    <Hr style={divider} />

                    <Section style={totalSection}>
                        <Row>
                            <Column>
                                <Text style={totalLabel}>Total Amount:</Text>
                            </Column>
                            <Column>
                                <Text style={totalAmountStyle}>${totalAmount.toFixed(2)}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={footer}>
                        <Text style={footerText}>
                            If you have any questions, please contact our support team.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const header = {
    padding: '0 24px',
};

const heading = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
};

const subHeading = {
    fontSize: '16px',
    color: '#666',
};

const section = {
    padding: '0 24px',
    marginTop: '24px',
};

const sectionHeading = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '16px',
};

const label = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '4px',
};

const value = {
    fontSize: '14px',
    color: '#333',
    marginBottom: '12px',
};

const divider = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
};

const itemRow = {
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
};

const itemImageCol = {
    width: '80px',
};

const itemDetailsCol = {
    paddingLeft: '16px',
    flex: 1,
};

const itemTotalCol = {
    width: '80px',
    textAlign: 'right' as const,
};

const itemImage = {
    borderRadius: '4px',
};

const itemName = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '4px',
};

const itemPrice = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '4px',
};

const itemQuantity = {
    fontSize: '14px',
    color: '#666',
};

const itemTotal = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
};

const totalSection = {
    padding: '0 24px',
    marginTop: '24px',
};

const totalLabel = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right' as const,
};

const totalAmountStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right' as const,
};

const footer = {
    padding: '0 24px',
    marginTop: '24px',
    textAlign: 'center' as const,
};

const footerText = {
    fontSize: '12px',
    color: '#999',
};