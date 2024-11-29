using System;
using System.Net;
using System.Net.Mail;
using System.Web.Mvc;
using System.Security.Cryptography;
using System.Text;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Linq;
using System.Drawing;
using System.Drawing.Imaging;

namespace DoAnCSN.Controllers
{
    public class RootController : Controller
    {
        public static bool isSendEmail(string toEmail, string subject, string body)
        {
            try
            {
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587)
                {
                    Credentials = new NetworkCredential("ducpham2004nha@gmail.com", "oclezgkegttyuits"),
                    EnableSsl = true
                };

                MailMessage mail = new MailMessage
                {
                    From = new MailAddress("ducpham2004nha@gmail.com", "Usego"),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };

                mail.To.Add(toEmail);
                smtpClient.Send(mail);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending email: " + ex.Message);
                return false;
            }
        }

        public static string isHashPassword(string password)
        {
            using (SHA1 sha1 = SHA1.Create())
            {
                byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

                byte[] hashBytes = sha1.ComputeHash(passwordBytes);

                StringBuilder hashStringBuilder = new StringBuilder();
                foreach (var byteValue in hashBytes)
                {
                    hashStringBuilder.Append(byteValue.ToString("x2"));
                }

                return hashStringBuilder.ToString();
            }
        }

        public static bool isVerifyPassword(string enteredPassword, string storedHash)
        {
            string enteredPasswordHash = isHashPassword(enteredPassword);
            return storedHash == enteredPasswordHash;
        }

        public JsonResult isSendResponse(int code, string message, object data = null)
        {
            var response = new
            {
                code,
                message,
                data
            };

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        public String isSaveImages(IEnumerable<HttpPostedFileBase> files, string targetFolder, bool text = false)
        {
            if (files == null || !files.Any())
                return null;

            string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, targetFolder);

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            string queryImages = null;

            foreach (var file in files)
            {
                if (file != null && file.ContentLength > 0)
                {
                    try
                    {
                        var fileName = Path.GetFileName(file.FileName);
                        var filePath = Path.Combine(path, fileName);

                        file.SaveAs(filePath);
                        queryImages += filePath;

                        if (text)
                        {
                            isAddTextToImage(filePath);
                        }
                    }
                    catch (Exception)
                    {
                        return null;
                    }
                }
            }

            return queryImages;
        }

        private void isAddTextToImage(string filePath)
        {
            try
            {
                using (Bitmap bitmap = new Bitmap(filePath))
                {
                    using (Graphics graphics = Graphics.FromImage(bitmap))
                    {
                        graphics.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;
                        graphics.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;

                        Font font = new Font("Arial", 38, FontStyle.Bold);
                        Brush textBrush = new SolidBrush(Color.White);
                        Brush shadowBrush = new SolidBrush(Color.FromArgb(50, 50, 50));

                        string text = "Copyright © UseVN";

                        SizeF textSize = graphics.MeasureString(text, font);
                        float x = (bitmap.Width - textSize.Width) / 2;
                        float y = bitmap.Height - textSize.Height - 50;

                        graphics.DrawString(text, font, shadowBrush, x + 3, y + 3);
                        graphics.DrawString(text, font, textBrush, x, y);
                    }

                    bitmap.Save(filePath, ImageFormat.Png);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error adding text to image: " + ex.Message);
            }
        }
    }
}
