const nodemailer = require("nodemailer");

module.exports = async (email, subject, order) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    
        <!-- Favicon -->
        <link rel="icon" href="./images/favicon.png" type="image/x-icon" />
    
        <!-- Invoice styling -->
        <style>
            body {
                font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                text-align: center;
                color: #777;
            }
    
            body h1 {
                font-weight: 300;
                margin-bottom: 0px;
                padding-bottom: 0px;
                color: #000;
            }
    
            body h3 {
                font-weight: 300;
                margin-top: 10px;
                margin-bottom: 20px;
                font-style: italic;
                color: #555;
            }
    
            body a {
                color: #06f;
            }
    
            .invoice-box {
                max-width: 800px;
                margin: auto;
                padding: 30px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                font-size: 16px;
                line-height: 24px;
                font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                color: #555;
            }
    
            .invoice-box table {
                width: 100%;
                line-height: inherit;
                text-align: left;
                border-collapse: collapse;
            }
    
            .invoice-box table td {
                padding: 5px;
                vertical-align: top;
            }
    
            .invoice-box table tr td:nth-child(2) {
                text-align: right;
            }
    
            .invoice-box table tr.top table td {
                padding-bottom: 20px;
            }
    
            .invoice-box table tr.top table td.title {
                font-size: 45px;
                line-height: 45px;
                color: #333;
            }
    
            .invoice-box table tr.information table td {
                padding-bottom: 40px;
            }
    
            .invoice-box table tr.heading td {
                background: #eee;
                border-bottom: 1px solid #ddd;
                font-weight: bold;
            }
    
            .invoice-box table tr.details td {
                padding-bottom: 20px;
            }
    
            .invoice-box table tr.item td {
                border-bottom: 1px solid #eee;
            }
    
            .invoice-box table tr.item.last td {
                border-bottom: none;
            }
    
            .invoice-box table tr.total td:nth-child(2) {
                border-top: 2px solid #eee;
                font-weight: bold;
            }
    
            @media only screen and (max-width: 600px) {
                .invoice-box table tr.top table td {
                    width: 100%;
                    display: block;
                    text-align: center;
                }
    
                .invoice-box table tr.information table td {
                    width: 100%;
                    display: block;
                    text-align: center;
                }
            }
        </style>
    </head>
    <body>
        <div class="invoice-box">
            <table>
                <tr class="top">
                    <td colspan="4">
                        <table>
                            <tr>
                                <td>
                                    ${order.selectedStore.branchNo} <br/>
                                    ${order.selectedStore.address}
                                </td>
                                

                                 <td style="text-align: right;">
                                    Invoice #: ${order._id}<br />
                                    Created: ${new Date(
                                      order.createdAt
                                    ).toLocaleString()}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
    
                <tr class="information">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td>
                                    Delivery Address: <br/>
                                    ${order.deliveryAddress.houseNo}, ${
      order.deliveryAddress.purokNum
    } <br/>
                                    ${order.deliveryAddress.streetName}, ${
      order.deliveryAddress.barangay
    } <br/>
                                    ${order.deliveryAddress.city}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
    
             
                <tr class="heading">
                    <td>Item</td>
                    <td>Quantity</td>
                    <td>Price</td>
                    <td>Amount</td>
                </tr>
    
   ${
     order.orderItems.length > 0
       ? order.orderItems
           .map(
             (item) => `
        <tr class="item">
            <td>${item.type}</td>
            <td>${item.quantity}pc(s)</td>
            <td>₱ ${item.price}.00</td>
            <td>₱${item.quantity * item.price}.00</td>
        </tr>
    `
           )
           .join("")
       : ""
   }
                
${
  order.orderProducts.length > 0
    ? order.orderProducts
        .map(
          (item) => `
        <tr class="item">
            <td>${item.type}</td>
            <td>${item.quantity}pc(s)</td>
            <td>₱ ${item.price}.00</td>
            <td>₱${item.quantity * item.price}.00</td>
        </tr>
    `
        )
        .join("")
    : ""
}
                
                
    
                <tr>
                    <td>Delivery Fee</td>
                    <td></td>
                    <td></td>
                    <td>₱ ${order.selectedStore.deliveryFee}.00</td>
                </tr>
    
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                     <td><strong>Total: ₱ ${order.totalPrice}.00</strong></td>
                </tr>
                
                <tr class="heading">
					<td>Order Status</td>
                        <td></td>
                    <td></td>
                        <td></td>
              

				</tr>
              ${order.orderStatus
                .map(
                  (status) => `
                <tr class="details">
                        <td>  
                            ${status.orderLevel} - ${new Date(
                    status.datedAt
                  ).toLocaleString()}
                            ${
                              status.staff
                                ? ` <br/>
                            Staff: ${status.staff.fname} ${status.staff.lname}<br/>
                            Role: ${status.staff.role}
 <hr/>
                            `
                                : ""
                            }
                        </td> 
                </tr>
              
     `
                )
                .join("")}
            </table>
        </div>
    </body>
    </html>
    `;

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: subject,
      text: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent Successfully");
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};
