using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DoAnCSN.Utilities
{
    public static class RootUtilities
    {
        public static string isDateDiffInMinutes(DateTime dateTimeTwo, DateTime? dateTimeOne = null)
        {
            dateTimeOne = dateTimeOne ?? DateTime.Now;

            double minutes = Math.Abs((dateTimeTwo - dateTimeOne.Value).TotalMinutes);

            if (minutes < 60)
            {
                return $"{Math.Round(minutes)} phút trước";
            }
            else if (minutes < 1440)
            {
                return $"{Math.Round(minutes / 60)} giờ trước";
            }
            else if (minutes < 43200)
            {
                return $"{Math.Floor(minutes / 1440)} ngày trước";
            }
            else if (minutes < 518400)
            {
                return $"{Math.Floor(minutes / 43200)} tháng trước";
            }
            else
            {
                return $"{Math.Floor(minutes / 518400)} năm trước";
            }
        }

        public static string IsProcessString(string input, bool first = true)
        {
            if (string.IsNullOrEmpty(input))
            {
                return string.Empty;
            }

            string[] parts = input.Split(new string[] { "||," }, StringSplitOptions.None);

            return (first) ? parts[0].Trim() : string.Join(", ", parts.Select(p => p.Trim()));
        }
    }
}