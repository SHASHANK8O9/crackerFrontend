import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components"
import * as React from "react"

interface OrderItem {
    id: string
    name: string
    price: number
    quantity: number
    image: string
}

interface OrderConfirmationEmailProps {
    fullName: string
    email: string
    phone: string
    address: string
    orderNotes: string
    orderItems: OrderItem[]
}
export const OrderConfirmation: React.FC<Readonly<OrderConfirmationEmailProps>> = ({
    fullName,
    email,
    phone,
    address,
    orderNotes,
    orderItems,
}) => {
    const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <Html>
            <Head />
            <Preview>Your order has been confirmed</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={logoContainer}>
                        {/* <Img src={`${baseUrl}/logo.png`} width="120" height="36" alt="Your Store" style={logo} /> */}
                    </Section>
                    <Section style={section}>
                        <Heading style={h1}>Order Confirmation</Heading>
                        <Text style={text}>Hi {fullName},</Text>
                        <Text style={text}>Thank you for your order. We've received your order and are processing it now.</Text>

                        <Section style={orderInfoSection}>
                            <Heading as="h2" style={h2}>
                                Customer Information
                            </Heading>
                            <Text style={text}>
                                <strong>Name:</strong> {fullName}
                            </Text>
                            <Text style={text}>
                                <strong>Email:</strong> {email}
                            </Text>
                            <Text style={text}>
                                <strong>Phone:</strong> {phone}
                            </Text>
                            <Text style={text}>
                                <strong>Address:</strong>{" "}
                                {address.split("\n").map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i < address.split("\n").length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </Text>
                            {orderNotes && (
                                <>
                                    <Text style={text}>
                                        <strong>Order Notes:</strong>
                                    </Text>
                                    <Text style={noteText}>{orderNotes}</Text>
                                </>
                            )}
                        </Section>

                        <Hr style={hr} />

                        <Section>
                            <Heading as="h2" style={h2}>
                                Order Details
                            </Heading>

                            {orderItems.map((item) => (
                                <Row key={item.id} style={orderItem}>
                                    <Column style={imageColumn}>
                                        <Img src={item.image} width="80" height="80" alt={item.name} style={productImage} />
                                    </Column>
                                    <Column style={detailsColumn}>
                                        <Text style={productName}>{item.name}</Text>
                                        <Text style={productMeta}>
                                            Quantity: {item.quantity} × ${item.price.toFixed(2)}
                                        </Text>
                                        <Text style={productPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                                    </Column>
                                </Row>
                            ))}

                            <Hr style={hr} />

                            <Row style={totalRow}>
                                <Column style={{ width: "100%" }}>
                                    <Text style={totalText}>
                                        <strong>Total:</strong> ${totalAmount.toFixed(2)}
                                    </Text>
                                </Column>
                            </Row>
                        </Section>

                        <Hr style={hr} />

                        <Section>
                            <Text style={footerText}>
                                If you have any questions about your order, please contact our customer service at{" "}
                                <Link href="mailto:support@yourstore.com" style={link}>
                                    support@yourstore.com
                                </Link>
                            </Text>
                        </Section>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
// Styles
const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
}

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0",
    maxWidth: "600px",
}

const logoContainer = {
    padding: "20px",
    borderBottom: "1px solid #e6ebf1",
}

const logo = {
    margin: "0 auto",
}

const section = {
    padding: "0 24px",
}

const h1 = {
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "30px 0",
    padding: "0",
    textAlign: "center" as const,
}

const h2 = {
    color: "#333",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "24px 0 16px",
}

const text = {
    color: "#333",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "12px 0",
}

const noteText = {
    color: "#666",
    fontSize: "14px",
    fontStyle: "italic",
    lineHeight: "21px",
    margin: "12px 0",
    padding: "12px",
    backgroundColor: "#f9f9f9",
    borderRadius: "4px",
}

const orderInfoSection = {
    backgroundColor: "#f9f9f9",
    padding: "16px",
    borderRadius: "4px",
    margin: "24px 0",
}

const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
}

const orderItem = {
    margin: "12px 0",
}

const imageColumn = {
    width: "80px",
    verticalAlign: "top",
}

const detailsColumn = {
    paddingLeft: "16px",
    verticalAlign: "top",
}

const productImage = {
    borderRadius: "4px",
    border: "1px solid #e6ebf1",
}

const productName = {
    color: "#333",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0 0 4px",
}

const productMeta = {
    color: "#666",
    fontSize: "14px",
    margin: "0 0 4px",
}

const productPrice = {
    color: "#333",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "8px 0 0",
}

const totalRow = {
    margin: "12px 0",
}

const totalText = {
    color: "#333",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "right" as const,
}

const footerText = {
    color: "#666",
    fontSize: "14px",
    lineHeight: "21px",
    margin: "24px 0",
    textAlign: "center" as const,
}

const link = {
    color: "#2754C5",
    textDecoration: "underline",
}

