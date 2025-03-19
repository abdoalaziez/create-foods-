export default function Price({ price, locale, currency }) {
    // تحقق من القيم الافتراضية في حالة كانت غير موجودة
    const formatPrice = () => {
      if (!currency) {
        console.error("Currency code is required.");
        return "Invalid price";
      }
      if (!locale) {
        console.error("Locale is required.");
        return "Invalid locale";
      }
      
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      }).format(price);
    };
  
    return <span>{formatPrice()}</span>;
  }
  
  Price.defaultProps = {
    locale: 'en-US',
    currency: 'USD',
  };
  