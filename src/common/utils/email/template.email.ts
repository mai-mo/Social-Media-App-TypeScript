
import { FACEBOOK, INSTAGRAM, TWITTER } from "../../../config/config.js"

export const emailTemplate = ({ title, code } : {title: string, code: number}) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <style type="text/css">
            body {
                background-color: #88BDBF;
                margin: 0px;
                padding: 40px 0;
                font-family: sans-serif;
            }
            .main-table {
                margin: auto;
                padding: 30px;
                background-color: #F3F3F3;
                border: 1px solid #630E2B;
                width: 50%;
                min-width: 320px;
            }
            .header-table {
                width: 100%;
                margin-bottom: 20px;
            }
            .view-link {
                text-decoration: none;
                color: #2b6cb0;
                font-size: 14px;
            }
            .content-table {
                text-align: center;
                width: 100%;
                background-color: #fff;
                border-collapse: collapse;
            }
            .banner-zone {
                background-color: #630E2B;
                height: 140px;
                text-align: center;
                vertical-align: middle;
            }
            .title-zone {
                padding: 40px 20px 20px 20px;
                color: #630E2B;
                font-size: 28px;
                font-weight: bold;
            }
            .code-zone {
                padding: 0px 40px 40px 40px;
            }
            .code-box {
                background-color: #630E2B;
                color: #fff;
                padding: 15px;
                font-size: 22px;
                font-weight: bold;
                border-radius: 4px;
                letter-spacing: 2px;
            }
            .footer-zone {
                text-align: center;
                padding: 30px 10px 10px 10px;
            }
            .social-icon {
                color: #630E2B;
                font-size: 22px;
                margin: 0 10px;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <table border="0" cellpadding="0" cellspacing="0" class="main-table">
            <!-- Header Row: Logo & View In Website -->
            <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" class="header-table">
                        <tr>
                            <td>
                                <img width="120px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png" alt="LINK-iT" style="display: block;"/>
                            </td>
                            <td style="text-align: right; vertical-align: middle;">
                                <a href="http://localhost:4200/#/" target="_blank" class="view-link">View In Website</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <!-- Body Row: White Card Box -->
            <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" class="content-table">
                        <!-- Maroon Banner with Mail Icon -->
                        <tr>
                            <td class="banner-zone">
                                <img width="60px" height="60px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png" alt="Mail Icon" style="display: inline-block; vertical-align: middle;">
                            </td>
                        </tr>
                        <!-- Dynamic Title (e.g., Verify account) -->
                        <tr>
                            <td class="title-zone">
                                ${title || 'Verify account'}
                            </td>
                        </tr>
                        <!-- Dynamic Verification Code Button -->
                        <tr>
                            <td class="code-zone">
                                <div class="code-box">
                                    ${code || '------'}
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <!-- Footer Row: Social Media Links -->
            <tr>
                <td class="footer-zone">
                    <a href="${FACEBOOK || '#'}" target="_blank" class="social-icon"><i class="fa fa-facebook"></i></a>
                    <a href="${INSTAGRAM || '#'}" target="_blank" class="social-icon"><i class="fa fa-instagram"></i></a>
                    <a href="${TWITTER || '#'}" target="_blank" class="social-icon"><i class="fa fa-twitter"></i></a>
                </td>
            </tr>
        </table>
    </body>
    </html>`
}