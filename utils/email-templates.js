export const resetPasswordTemplate = (
  name,
  token
) => emailTemplate({ 
  name, 
  token, 
  href: `${process.env.APP_URL}/auth/confirm-password/?token=${token}`,
  btnText: 'Set Password'
});

export const emailVerificationTemplate = (
  name,
  token,
) => emailTemplate({ 
  name, 
  token,
  href: `${process.env.WEB_APP_URL}email-verification/?token=${token}`, 
  btnText: 'Verify Email' 
});

const emailTemplate = ({
  name,
  href,
  btnText
}) => {
  return `
  <!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="eng">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta content="telephone=no" name="format-detection" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Welcome</title>
</head>

<body bgcolor="#ffffff">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#fff;">
    <tr>
      <td align="center">
        <table width="645" border="0" cellpadding="0" cellspacing="0"
          style="background-color:#ffffff;; max-width: 644px; overflow: hidden; border: 1px solid #d3d3d3">
          <tr>
            <td style="padding: 16px 0px 0;background:#268AFF;">
            </td>
          </tr>
          <tr>
            <td style="background-color: #fff;  padding: 30px 0 20px;">
              <table width="545" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" colspan="4" style="font-family: Arial, serif; font-weight: 700;
                    font-size: 36px;
                    line-height: 44px;
                    text-transform: capitalize;
                    color: #000000; padding-bottom: 48px">Welcome</td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td
                          style="font-family: Arial, serif; font-size: 14px; font-weight: normal; color: #000000; text-align: left; padding-bottom: 8px;">
                          Hi <strong>${name}!</strong></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #ffffff; padding: 32px 0px 0px;border-radius: 4px;" align="left">
                    <table width="135"
                      style="border-radius: 4px;margin:0 auto; text-align:center; background-color:#268AFF; border-color:#268AFF; border-style:solid; border-width:2px; color:#FFFFFF; font-family:Arial, sans-serif; text-decoration:none; font-weight:bold; line-height:normal; border-collapse:separate;"
                      cellspacing="0" cellpadding="0" align="left">
                      <tr>
                        <td style="padding: 8px; width:135px; border-radius: 4px;" align="center">
                          <a style="font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; color: #fff; text-decoration: none;"
                          href=${href} >${btnText}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color: #fff;  padding: 12px 0 20px;">
              <table width="545" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" colspan="4" style="font-family: Arial, serif; font-weight: 400;
                    font-size: 13px;
                    line-height: 16px;
                    text-transform: capitalize;
                    color: #000000; padding-bottom: 4px">Cheers</td>
                </tr>
                <tr>
                  <td align="left" colspan="4" style="font-family: Arial, serif; font-weight: 700;
                    font-size: 13px;
                    line-height: 16px;
                    text-transform: capitalize;
                    color: #000000; padding-bottom: 32px">TCTV</td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #fff;  padding: 130px 0 32px;">
              <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" width="544" align="center">
                      <tr>
                        <td>
                          <table cellpadding="0" cellspacing="0" width="544">
                            <tr>
                              <td
                                style="font-size: 12px;font-weight:normal; font-family: Arial, sans-serif; color: #000000; line-height: 18px; text-align: left; background-color: white; padding: 10px 0;"
                                width="545">
                                © 2025 TCTV
                              </td>
                              <td>
                                <table cellpadding="0" cellspacing="0" align="center">
                                  <tr style="padding-top: 10px">
                                    <td height="40" style="padding: 5px;padding-right:19px;">
                                      <a href="#" target="_blank" style="text-decoration: none;"><img
                                        src="https://imgur.com/yFMtxWj.png" alt="" width="16" height="16"></a>
                                    </td>
                                    <td height="40" style="padding: 5px;padding-right:19px;">
                                      <a href="#" target="_blank"><img src="https://imgur.com/tVzkpBa.png" alt=""
                                        width="16" height="16"></a>
                                    </td>
                                    <td height="40" style="padding: 5px;padding-right:19px;">
                                      <a href="#" target="_blank"><img src="https://imgur.com/lrdYFfN.png" alt=""
                                        width="16" height="16"></a>
                                    </td>
                                    <td height="40" style="padding: 5px;padding-right:0;">
                                      <a href="#" target="_blank"><img src="https://imgur.com/7hyu0Py.png" alt=""
                                        width="16" height="16"></a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
`
}
