import nodemailer from "nodemailer";
import { OrderConfirmation } from "@/components/order-confirmation-template";
import { render } from "@react-email/components";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const SMTP_USER = process.env.SMTP_USER!;
const SMTP_PASS = process.env.SMTP_PASS!;

export const orderEmail = async (
    recipient: "admin" | "user",
    email: string,
    orderData: any
) => {
    try {
        if (!email) throw new Error("Recipient email is required");
        if (!orderData) throw new Error("Order data is missing");
        if (!SMTP_USER || !SMTP_PASS) throw new Error("SMTP credentials are missing");

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });

        const emailHtml = await render(<OrderConfirmation {...orderData} />);

        await transporter.sendMail({
            from: ADMIN_EMAIL,
            to: [email, ADMIN_EMAIL],
            subject: recipient === "user" ? "Your Enquiry Confirmation" : "New Enquiry Received",
            html: emailHtml,
        });

        console.log("Order email sent successfully!");
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending order email:", error);

        return {
            success: false,
            message: "Failed to send email",
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
