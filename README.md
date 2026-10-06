# Laxmi — Best Friend?

एक playful responsive page जिसमें Yes और No buttons tap/click पर move होते हैं। पहला tap remotely Google Sheet में save किया जा सकता है।

## Google Sheet tracking setup

1. एक नई Google Sheet बनाइए।
2. **Extensions → Apps Script** खोलिए।
3. repository की `google-apps-script.gs` फाइल का code वहाँ paste करके **Save** करें।
4. **Deploy → New deployment** चुनें।
5. Type में **Web app** चुनें।
6. Execute as: **Me** रखें। Who has access: **Anyone** रखें।
7. **Deploy** दबाकर मिलने वाला Web app URL copy करें।
8. `script.js` में यह line खोजें:

   ```js
   const TRACKING_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```

   और placeholder को अपने Web app URL से बदलें।
9. बदलाव commit/push करके page खोलें। हर browser/device से केवल पहला Yes/No tap एक row में आएगा।

> Tracking केवल first tap, समय, page URL, browser language, screen size और user-agent save करती है। किसी व्यक्ति की पहचान सीधे collect नहीं की जाती।
