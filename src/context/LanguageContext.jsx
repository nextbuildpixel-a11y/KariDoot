import React, { createContext, useContext, useState, useEffect } from 'react';

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', speechCode: 'en-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechCode: 'hi-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechCode: 'te-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechCode: 'ta-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechCode: 'bn-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechCode: 'mr-IN' },
];

const TRANSLATIONS = {
  en: {
    appTitle: 'KariDoot AI',
    appSubtitle: "The Artisan's Messenger to ONDC",
    sellerRole: 'Artisan Studio',
    buyerRole: 'ONDC Marketplace',
    audioGuide: 'Listen Guide',
    audioSpeaking: 'Playing Audio...',
    audioStopped: 'Audio Guide',
    skipIntro: 'Skip Intro →',
    
    // Spotlight
    tourStep1Title: '1. Snap Photo & Voice Note',
    tourStep1Desc: 'Capture your craft in clear light and speak about how you created it.',
    tourStep2Title: '2. Calibrate Fair Living Wages',
    tourStep2Desc: 'Set honest material and labor hours so you never sell below fair living wage.',
    tourStep3Title: '3. Publish to ONDC & WhatsApp',
    tourStep3Desc: 'Export direct Beckn protocol catalogs and share instant UPI orders.',
    next: 'Next',
    previous: 'Previous',
    finish: 'Get Started',
    close: 'Close',

    // Scanner
    scanHeadline: 'Capture Your Masterpiece',
    scanSubheadline: 'Align your handmade craft in the viewfinder & record your craft story',
    cameraLive: 'Live Camera Viewfinder',
    takePhoto: 'Capture Frame',
    switchCamera: 'Switch Camera',
    recordVoice: 'Tap to Speak Craft Story',
    recordingVoice: 'Listening... (Speak naturally)',
    stopRecording: 'Save Voice Note',
    voicePromptHelp: 'Say: "I wove this silk saree with natural indigo dye, taking 3 days..."',
    voiceNoteSaved: 'Voice story recorded successfully!',
    samplePresets: 'Or Select a Craft Preset:',
    craftBanarasi: 'Varanasi Zari Brocade Saree',
    craftPottery: 'Bankura Terracotta Figurine',
    craftBidri: 'Bidriware Silver Inlay Box',
    craftPashmina: 'Kashmiri Hand-spun Pashmina',

    // Photo Studio
    studioHeadline: 'AI Photo Studio & Staging',
    studioSubheadline: 'Instant background removal & Pollinations generative heritage backdrops',
    original: 'Original Workshop Photo',
    cutout: 'Studio Cutout (No Background)',
    chipWhite: 'Clean Studio White',
    chipLoom: 'Terracotta Loom Workshop',
    chipPavilion: 'Heritage Royal Pavilion',
    generatingBackdrop: 'Generating AI Lifestyle Scene...',
    proceedToCatalog: 'Analyze Craft with Catalog AI →',

    // AI Cataloger
    catalogHeadline: 'Catalog AI Vision Analysis',
    catalogSubheadline: 'Multimodal AI extracting authenticity, craft heritage & bilingual story',
    analyzingGemini: 'Catalog AI is inspecting craft weaves and voice transcript...',
    craftTitle: 'Generated Product Title',
    craftStory: 'Bilingual Craft Heritage Story',
    detectedMaterials: 'Detected Authentic Materials',
    authenticityBadge: 'Authenticity & GI Tag Notes',
    hsnCode: 'Suggested ONDC / HSN Code',
    proceedToPricing: 'Proceed to Fair Wage Calibrator →',

    // Pricing
    pricingHeadline: 'Dynamic ML Fair-Wage Calibrator',
    pricingSubheadline: 'Guaranteed living wages with 0% middleman platform commissions',
    materialCost: 'Raw Material Cost',
    craftHours: 'Crafting Time (Hours)',
    hourlyWage: 'Artisan Living Wage (₹ / hr)',
    logisticsCost: 'Eco-Packaging & ONDC Logistics',
    profitMargin: 'Artisan Pride Margin (%)',
    totalOndcPrice: 'Fair ONDC Retail Price',
    artisanNetTakeHome: 'Your Direct Net Take-Home',
    benchmarksTitle: 'Marketplace Earnings Comparison',
    amazonBenchmark: 'Amazon Karigar (~35% Comm. + Ads)',
    flipkartBenchmark: 'Flipkart Samarth (Tier Floor)',
    luxuryBenchmark: 'Handmade Export Retail',
    karidootTakehome: 'KariDoot Direct ONDC (0% Comm.)',
    proceedToExport: 'Export & Distribute Product →',

    // Export
    exportHeadline: 'Multi-Channel Distribution Matrix',
    exportSubheadline: 'Deploy validated Beckn Protocol v1.2.0 JSON, CSV flat-files & WhatsApp direct',
    deployOndc: 'Download Beckn v1.2.0 JSON',
    deployCsv: 'Download Flipkart / Amazon CSV',
    shareWhatsapp: 'Share on WhatsApp with UPI',
    ondcPayloadPreview: 'ONDC Beckn Protocol JSON Payload Preview',
    copyJson: 'Copy JSON',
    jsonCopied: 'JSON Copied to Clipboard!',
    whatsappMessageSent: 'Ready to share with direct UPI payment link!',

    // Order Sim
    testOrderBtn: 'Test Incoming ONDC Order',
    spokenOrderAnnouncement: 'You have 1 new order for Pink Handloom Towel from Bangalore.',
    pickupModalTitle: 'Incoming ONDC Dispatch Alert',
    courierPartner: 'Assigned Logistics Partner',
    pickupTime: 'Estimated Pickup Slot',
    acceptPickup: 'Accept Courier Pickup',
    rejectPickup: 'Reject / Reschedule',
    pickupAccepted: 'Courier pickup scheduled! Tracking ID generated.',

    // Buyer Marketplace
    marketplaceHeadline: 'ONDC Verified Artisan Heritage Market',
    marketplaceSubheadline: 'Direct from rural weaver clusters with 100% verified provenance',
    searchCrafts: 'Search handloom sarees, terracotta, brassware...',
    allCategories: 'All Crafts',
    textiles: 'Textiles & Handloom',
    pottery: 'Earthenware & Pottery',
    metalcraft: 'Metalware & Filigree',
    woodcraft: 'Woodcarving',
    craftYears: 'Years Tradition',
    giCertified: 'GI Tag Certified',
    handloomMark: 'Handloom Mark',
    viewDetails: 'View Craft Story & Buy',
    buyViaOndc: 'Buy via ONDC Direct',
    addedByArtisan: 'Newly Cataloged in Studio',

    // Reviews
    reviewsTitle: 'Artisan Feedback & Buyer Photos',
    writeReview: 'Share Craft Feedback',
    buyerPhotoUpload: 'Attach Photo of Received Product',
    submitReview: 'Submit Verified Craft Review',
    verifiedBuyer: 'Verified ONDC Buyer',

    // Order Tracker
    trackerTitle: 'ONDC Real-Time Delivery Milestones',
    stage1: 'Order Placed & ONDC Confirmed',
    stage2: 'Handcrafted in Artisan Workshop',
    stage3: 'In Transit (Logistics Partner Assigned)',
    stage4: 'Out for Delivery',
    simulateNextStage: 'Simulate Next Delivery Stage',
    deliveryPartner: 'Delivery Partner',
    becknTxnId: 'Beckn Txn ID',
    estArrival: 'Estimated Arrival',
  },

  hi: {
    appTitle: 'कारीदूत AI',
    appSubtitle: 'ग्रामीण कारीगरों का ONDC डिजिटल सेतु',
    sellerRole: 'कारीगर स्टूडियो (विक्रेता)',
    buyerRole: 'ONDC बाज़ार (खरीदार)',
    audioGuide: 'मार्गदर्शिका सुनें',
    audioSpeaking: 'आवाज़ बज रही है...',
    audioStopped: 'मार्गदर्शिका सुनें',
    skipIntro: 'आगे बढ़ें →',

    // Spotlight
    tourStep1Title: '१. फोटो लें और बोलकर बताएं',
    tourStep1Desc: 'अच्छी रोशनी में अपने हस्तशिल्प की फोटो खींचें और उसकी खासियत बोलकर बताएं।',
    tourStep2Title: '२. उचित दैनिक पारिश्रमिक तय करें',
    tourStep2Desc: 'कच्चे माल और मेहनत के घंटों का सही मूल्य जोड़ें ताकि आपको पूरा हक मिले।',
    tourStep3Title: '३. ONDC और व्हाट्सएप पर बेचें',
    tourStep3Desc: 'बेकन प्रोटोकॉल कैटलॉग डाउनलोड करें और सीधे UPI पेमेंट लिंक शेयर करें।',
    next: 'आगे',
    previous: 'पीछे',
    finish: 'शुरू करें',
    close: 'बंद करें',

    // Scanner
    scanHeadline: 'अपनी कलाकृति की तस्वीर लें',
    scanSubheadline: 'कैमरे के चौखटे में शिल्प को रखें और अपनी भाषा में कारीगरी की कहानी बताएं',
    cameraLive: 'लाइव कैमरा दृश्य',
    takePhoto: 'फोटो खींचें',
    switchCamera: 'कैमरा बदलें',
    recordVoice: 'शिल्प की कहानी बोलने के लिए दबाएं',
    recordingVoice: 'सुन रहे हैं... (स्वाभाविक रूप से बोलें)',
    stopRecording: 'आवाज़ सहेजें',
    voicePromptHelp: 'बोलें: "मैंने यह रेशमी साड़ी प्राकृतिक नील से ३ दिनों में बुनी है..."',
    voiceNoteSaved: 'आपकी आवाज़ की कहानी सहेजी गई!',
    samplePresets: 'या कोई नमूना हस्तशिल्प चुनें:',
    craftBanarasi: 'वाराणसी ज़री ब्रोकेड साड़ी',
    craftPottery: 'बांकुड़ा टेराकोटा अश्व मूर्ति',
    craftBidri: 'बिद्रीवेयर चांदी नक्काशी बॉक्स',
    craftPashmina: 'कश्मीरी हाथ से काता गया पश्मीना',

    // Photo Studio
    studioHeadline: 'AI फोटो स्टूडियो और सजावट',
    studioSubheadline: 'एक क्लिक में पृष्ठभूमि हटाएं और AI से सुंदर परिवेश बनाएं',
    original: 'कार्यशाला की मूल तस्वीर',
    cutout: 'स्टूडियो कटआउट (पारदर्शी)',
    chipWhite: 'स्वच्छ स्टूडियो सफेद',
    chipLoom: 'पारंपरिक हथकरघा परिवेश',
    chipPavilion: 'शाही विरासत मंडप',
    generatingBackdrop: 'AI द्वारा जीवनशैली दृश्य तैयार हो रहा है...',
    proceedToCatalog: 'Catalog AI द्वारा विश्लेषण करें →',

    // AI Cataloger
    catalogHeadline: 'Catalog AI दृष्टि विश्लेषण',
    catalogSubheadline: 'मल्टीमॉडल AI द्वारा प्रामाणिकता, शिल्प विरासत और द्विभाषी विवरण',
    analyzingGemini: 'Catalog AI बुनाई और आपकी आवाज़ का विश्लेषण कर रहा है...',
    craftTitle: 'उत्पाद का शीर्षक',
    craftStory: 'द्विभाषी शिल्प विरासत कहानी',
    detectedMaterials: 'पहचानी गई प्रामाणिक सामग्री',
    authenticityBadge: 'जीआई टैग और प्रामाणिकता प्रमाण',
    hsnCode: 'अनुशंसित ONDC / HSN कोड',
    proceedToPricing: 'मूल्य निर्धारण पर जाएं →',

    // Pricing
    pricingHeadline: 'गतिशील उचित-पारिश्रमिक कैलकुलेटर',
    pricingSubheadline: 'शून्य बिचौलिया कमीशन के साथ सम्मानजनक आजीविका गारंटी',
    materialCost: 'कच्चे माल की लागत',
    craftHours: 'निर्माण में लगे घंटे',
    hourlyWage: 'कारीगर का प्रति घंटा वेतन (₹)',
    logisticsCost: 'पैकिंग और ONDC कूरियर',
    profitMargin: 'कारीगर का स्वाभिमान लाभ (%)',
    totalOndcPrice: 'उचित ONDC खुदरा मूल्य',
    artisanNetTakeHome: 'आपकी सीधी शुद्ध कमाई',
    benchmarksTitle: 'बाज़ार कमाई की तुलना',
    amazonBenchmark: 'अमेज़ॅन कारीगर (~३५% कमीशन + विज्ञापन)',
    flipkartBenchmark: 'फ्लिपकार्ट समर्थ (न्यूनतम सीमा)',
    luxuryBenchmark: 'विदेशी निर्यात खुदरा मूल्य',
    karidootTakehome: 'कारीदूत सीधा ONDC (०% कमीशन)',
    proceedToExport: 'उत्पाद वितरित और निर्यात करें →',

    // Export
    exportHeadline: 'बहु-चैनल वितरण केंद्र',
    exportSubheadline: 'सत्यापित बेकन v1.2.0 JSON, CSV स्प्रेडशीट और व्हाट्सएप डायरेक्ट',
    deployOndc: 'Beckn v1.2.0 JSON डाउनलोड करें',
    deployCsv: 'Flipkart / Amazon CSV डाउनलोड करें',
    shareWhatsapp: 'व्हाट्सएप और UPI लिंक भेजें',
    ondcPayloadPreview: 'ONDC बेकन प्रोटोकॉल JSON पूर्वावलोकन',
    copyJson: 'JSON कॉपी करें',
    jsonCopied: 'JSON कॉपी हो गया!',
    whatsappMessageSent: 'सीधे UPI भुगतान लिंक के साथ शेयर करने के लिए तैयार!',

    // Order Sim
    testOrderBtn: 'आने वाले ONDC ऑर्डर का परीक्षण करें',
    spokenOrderAnnouncement: 'आपके पास बैंगलोर से गुलाबी हैंडलूम तौलिए के लिए १ नया ऑर्डर आया है।',
    pickupModalTitle: 'नया ONDC डिलीवरी अलर्ट',
    courierPartner: 'निर्धारित लॉजिस्टिक्स पार्टनर',
    pickupTime: 'अनुमानित पिकअप समय',
    acceptPickup: 'कूरियर पिकअप स्वीकार करें',
    rejectPickup: 'अस्वीकार / पुनर्निर्धारित करें',
    pickupAccepted: 'कूरियर पिकअप बुक हो गया! ट्रैकिंग आईडी जनरेट हुई।',

    // Buyer Marketplace
    marketplaceHeadline: 'ONDC सत्यापित हस्तशिल्प बाज़ार',
    marketplaceSubheadline: 'सीधे ग्रामीण बुनकरों से १००% प्रामाणिक हस्तनिर्मित कृतियां',
    searchCrafts: 'हथकरघा साड़ी, टेराकोटा, पीतल शिल्प खोजें...',
    allCategories: 'सभी शिल्प',
    textiles: 'वस्त्र और हथकरघा',
    pottery: 'मिट्टी के बर्तन और मूर्तियां',
    metalcraft: 'धातु शिल्प और नक्काशी',
    woodcraft: 'काष्ठ कला',
    craftYears: 'वर्षों की परंपरा',
    giCertified: 'GI टैग प्रमाणित',
    handloomMark: 'हैंडलूम मार्क',
    viewDetails: 'शिल्प कथा देखें और खरीदें',
    buyViaOndc: 'ONDC द्वारा सीधे खरीदें',
    addedByArtisan: 'स्टूडियो में नया जोड़ा गया',

    // Reviews
    reviewsTitle: 'खरीदारों की प्रतिक्रिया और तस्वीरें',
    writeReview: 'शिल्प पर अपनी राय लिखें',
    buyerPhotoUpload: 'प्राप्त उत्पाद की तस्वीर अपलोड करें',
    submitReview: 'सत्यापित समीक्षा भेजें',
    verifiedBuyer: 'सत्यापित ONDC खरीदार',

    // Order Tracker
    trackerTitle: 'ONDC वास्तविक समय डिलीवरी ट्रैकर',
    stage1: 'ऑर्डर दर्ज और ONDC द्वारा पुष्ट',
    stage2: 'कारीगर की कार्यशाला में हस्तनिर्मित',
    stage3: 'रास्ते में (लॉजिस्टिक्स पार्टनर सौंपा गया)',
    stage4: 'वितरण हेतु निकला (Out for Delivery)',
    simulateNextStage: 'अगले डिलीवरी चरण का परीक्षण करें',
    deliveryPartner: 'वितरण भागीदार',
    becknTxnId: 'बेकन लेनदेन आईडी',
    estArrival: 'अनुमानित आगमन',
  },

  te: {
    appTitle: 'కారిదూత్ AI',
    appSubtitle: 'గ్రామీణ కళాకారుల ONDC డిజిటల్ వారధి',
    sellerRole: 'చేతివృత్తుల స్టూడియో (విక్రేత)',
    buyerRole: 'ONDC మార్కెట్ (కొనుగోలుదారు)',
    audioGuide: 'వాయిస్ గైడ్ వినండి',
    audioSpeaking: 'ఆడియో నడుస్తోంది...',
    audioStopped: 'వాయిస్ గైడ్',
    skipIntro: 'పరిచయం దాటవేయి →',

    tourStep1Title: '1. ఫోటో తీయండి & మాట్లాడండి',
    tourStep1Desc: 'మీ చేతిపనిని మంచి వెలుతురులో ఫోటో తీసి, దాని ప్రత్యేకతను చెప్పండి.',
    tourStep2Title: '2. న్యాయమైన వేతనం నిర్ణయించండి',
    tourStep2Desc: 'ముడిసరుకు మరియు శ్రమ గంటలకు తగిన పారితోషికాన్ని సులభంగా గణించండి.',
    tourStep3Title: '3. ONDC & వాట్సాప్‌లో విక్రయించండి',
    tourStep3Desc: 'బెక్‌న్ ప్రోటోకాల్ ద్వారా కేటలాగ్ డౌన్‌లోడ్ చేయండి మరియు డైరెక్ట్ UPI ద్వారా ఆర్డర్లు పొందండి.',
    next: 'తరువాత',
    previous: 'వెనుకకు',
    finish: 'ప్రారంభించండి',
    close: 'మూసివేయి',

    scanHeadline: 'మీ కళాఖండాన్ని బంధించండి',
    scanSubheadline: 'కెమెరా ఫ్రేమ్‌లో చేతిపనిని ఉంచి మీ వాయిస్ నోట్ రికార్డ్ చేయండి',
    cameraLive: 'లైవ్ కెమెరా ఫ్రేమ్',
    takePhoto: 'ఫోటో తీయండి',
    switchCamera: 'కెమెరా మార్చండి',
    recordVoice: 'కళా విశేషాలు చెప్పడానికి నొక్కండి',
    recordingVoice: 'వింటున్నాము... (సహజంగా మాట్లాడండి)',
    stopRecording: 'వాయిస్ నోట్ భద్రపరచు',
    voicePromptHelp: 'చెప్పండి: "ఈ పట్టు చీరను సహజ రంగులతో 3 రోజులు కష్టపడి నేసాను..."',
    voiceNoteSaved: 'వాయిస్ నోట్ రికార్డ్ చేయబడింది!',
    samplePresets: 'లేదా నమూనా చేతిపనిని ఎంచుకోండి:',
    craftBanarasi: 'వారణాసి జరీ బ్రోకేడ్ చీర',
    craftPottery: 'బాంకురా టెర్రకోట గుర్రం',
    craftBidri: 'బిద్రివెల్లీ వెండి చెక్కడపు పెట్టె',
    craftPashmina: 'కాశ్మీరీ చేనేత పష్మినా',

    studioHeadline: 'AI ఫోటో స్టూడియో',
    studioSubheadline: 'తక్షణ బ్యాక్‌గ్రౌండ్ తొలగింపు & ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ అలంకరణ',
    original: 'వర్క్‌షాప్ అసలు ఫోటో',
    cutout: 'స్టూడియో కటౌట్ (బ్యాక్‌గ్రౌండ్ లేదు)',
    chipWhite: 'క్లీన్ స్టూడియో వైట్',
    chipLoom: 'సాంప్రదాయ మగ్గం నేపథ్యం',
    chipPavilion: 'రాచరిక వారసత్వ వేదిక',
    generatingBackdrop: 'AI లైఫ్‌స్టైల్ సీన్ రూపొందిస్తోంది...',
    proceedToCatalog: 'Catalog AI విశ్లేషణకు వెళ్లండి →',

    catalogHeadline: 'Catalog AI విజన్ విశ్లేషణ',
    catalogSubheadline: 'మల్టీమోడల్ AI ద్వారా సాంప్రదాయ ప్రామాణికత మరియు ద్విభాషా కథనం',
    analyzingGemini: 'Catalog AI మీ చేతిపని మరియు వాయిస్‌ని విశ్లేషిస్తోంది...',
    craftTitle: 'ఉత్పత్తి శీర్షిక',
    craftStory: 'ద్విభాషా కళా చరిత్ర కథ',
    detectedMaterials: 'గుర్తించబడిన సహజ పదార్థాలు',
    authenticityBadge: 'GI ట్యాగ్ & ప్రామాణికత వివరాలు',
    hsnCode: 'సూచించబడిన ONDC / HSN కోడ్',
    proceedToPricing: 'ధర నిర్ణయానికి వెళ్లండి →',

    pricingHeadline: 'డైనమిక్ న్యాయమైన-వేతన గణన',
    pricingSubheadline: 'మధ్యవర్తుల రుసుములు లేకుండా గ్రామీణ కళాకారులకు పూర్తి గౌరవం',
    materialCost: 'ముడిసరుకు ఖర్చు',
    craftHours: 'పని గంటలు',
    hourlyWage: 'గంట వేతనం (₹)',
    logisticsCost: 'ప్యాకింగ్ & ONDC రవాణా',
    profitMargin: 'కళాకారుడి లాభం (%)',
    totalOndcPrice: 'న్యాయమైన ONDC విక్రయ ధర',
    artisanNetTakeHome: 'మీ ప్రత్యక్ష నికర ఆదాయం',
    benchmarksTitle: 'మార్కెట్‌ప్లేస్ ఆదాయాల పోలిక',
    amazonBenchmark: 'అమెజాన్ కారిగర్ (~35% కమీషన్ + ప్రకటనలు)',
    flipkartBenchmark: 'ఫ్లిప్‌కార్ట్ సమర్థ్ (కనీస పరిమితి)',
    luxuryBenchmark: 'ఎగుమతి రిటైల్ ధర',
    karidootTakehome: 'కారిదూత్ ONDC (0% కమీషన్)',
    proceedToExport: 'ఉత్పత్తిని పంపిణీ చేయండి →',

    exportHeadline: 'బహుళ-ఛానల్ పంపిణీ',
    exportSubheadline: 'ధృవీకరించబడిన Beckn v1.2.0 JSON, CSV మరియు వాట్సాప్ డైరెక్ట్',
    deployOndc: 'Beckn v1.2.0 JSON డౌన్‌లోడ్ చేయండి',
    deployCsv: 'Flipkart / Amazon CSV డౌన్‌లోడ్ చేయండి',
    shareWhatsapp: 'వాట్సాప్‌లో UPI లింక్ పంపండి',
    ondcPayloadPreview: 'ONDC Beckn ప్రోటోకాల్ JSON పరిదృశ్యం',
    copyJson: 'JSON కాపీ చేయండి',
    jsonCopied: 'JSON కాపీ చేయబడింది!',
    whatsappMessageSent: 'డైరెక్ట్ UPI చెల్లింపు లింక్‌తో షేర్ చేయడానికి సిద్ధం!',

    testOrderBtn: 'రాబోయే ONDC ఆర్డర్‌ను పరీక్షించండి',
    spokenOrderAnnouncement: 'బెంగళూరు నుండి పింక్ హ్యాండ్‌లూమ్ టవల్ కోసం మీకు 1 కొత్త ఆర్డర్ వచ్చింది.',
    pickupModalTitle: 'కొత్త ONDC డిస్పాచ్ హెచ్చరిక',
    courierPartner: 'కేటాయించిన లాజిస్టిక్స్ భాగస్వామి',
    pickupTime: 'అంచనా వేసిన పికప్ సమయం',
    acceptPickup: 'కొరియర్ పికప్‌ను అంగీకరించండి',
    rejectPickup: 'తిరస్కరించు / రీషెడ్యూల్',
    pickupAccepted: 'కొరియర్ పికప్ షెడ్యూల్ చేయబడింది! ట్రాకింగ్ ID రూపొందించబడింది.',

    marketplaceHeadline: 'ONDC ధృవీకరించబడిన చేతివృత్తుల మార్కెట్',
    marketplaceSubheadline: 'నేతకారుల నుండి నేరుగా 100% అసలైన చేతిపనులు',
    searchCrafts: 'చేనేత చీరలు, మట్టిపాత్రలు, ఇత్తడి కళలను శోధించండి...',
    allCategories: 'అన్ని కళలు',
    textiles: 'వస్త్రాలు & చేనేత',
    pottery: 'మట్టిపాత్రలు & శిల్పాలు',
    metalcraft: 'లోహపు కళ & ఫిలిగ్రీ',
    woodcraft: 'చెక్క చెక్కడాలు',
    craftYears: 'సంవత్సరాల సంప్రదాయం',
    giCertified: 'GI ట్యాగ్ సర్టిఫైడ్',
    handloomMark: 'హ్యాండ్‌లూమ్ మార్క్',
    viewDetails: 'కళా విశేషాలు చూసి కొనండి',
    buyViaOndc: 'ONDC ద్వారా నేరుగా కొనండి',
    addedByArtisan: 'స్టూడియో నుండి జోడించబడింది',

    reviewsTitle: 'కొనుగోలుదారుల సమీక్షలు & ఫోటోలు',
    writeReview: 'మీ సమీక్షను తెలియజేయండి',
    buyerPhotoUpload: 'ఉత్పత్తి ఫోటోను జతచేయండి',
    submitReview: 'సమీక్షను సమర్పించండి',
    verifiedBuyer: 'ధృవీకరించబడిన ONDC కొనుగోలుదారు',

    trackerTitle: 'ONDC రియల్-టైమ్ డెలివరీ ట్రాకింగ్',
    stage1: 'ఆర్డర్ నమోదు చేయబడింది & ONDC నిర్ధారించింది',
    stage2: 'కళాకారుడి వర్క్‌షాప్‌లో తయారుచేయబడింది',
    stage3: 'రవాణాలో ఉంది (లాజిస్టిక్స్ కేటాయించబడింది)',
    stage4: 'డెలివరీకి బయలుదేరింది',
    simulateNextStage: 'తరువాతి దశను అనుకరించండి',
    deliveryPartner: 'డెలివరీ భాగస్వామి',
    becknTxnId: 'బెక్‌న్ లావాదేవీ ID',
    estArrival: 'అంచనా వేసిన రాక సమయం',
  },

  ta: {
    appTitle: 'காரிதூத் AI',
    appSubtitle: 'கிராமப்புற கைவினைஞர்களின் ONDC டிஜிட்டல் பாலம்',
    sellerRole: 'கைவினைஞர் அரங்கம் (விற்பனையாளர்)',
    buyerRole: 'ONDC சந்தை (வாங்குபவர்)',
    audioGuide: 'வழிகாட்டலைக் கேளுங்கள்',
    audioSpeaking: 'ஆடியோ ஒலிக்கிறது...',
    audioStopped: 'வழிகாட்டல்',
    skipIntro: 'தவிர்க்க →',

    tourStep1Title: '1. புகைப்படம் & குரல் பதிவு',
    tourStep1Desc: 'நல்ல வெளிச்சத்தில் உங்கள் கைவினைப்பொருளைப் படம் பிடித்து அதன் சிறப்பை குரலில் சொல்லுங்கள்.',
    tourStep2Title: '2. நியாயமான ஊதியம் கணக்கிடுங்கள்',
    tourStep2Desc: 'பொருட்களின் செலவு மற்றும் உழைப்பின் நேரத்திற்கு தகுந்த ஊதியத்தை துல்லியமாக நிர்ணயிக்கவும்.',
    tourStep3Title: '3. ONDC & வாட்ஸ்அப்பில் விற்கவும்',
    tourStep3Desc: 'பெக்ன் புரோட்டோகால் மூலம் பட்டியலை பதிவிறக்கி, நேரடி UPI மூலம் பணம் பெறுங்கள்.',
    next: 'அடுத்து',
    previous: 'முந்தைய',
    finish: 'தொடங்குங்கள்',
    close: 'மூடு',

    scanHeadline: 'உங்கள் கைவினைப் படைப்பைப் படம் பிடிக்கவும்',
    scanSubheadline: 'கேமரா சட்டகத்தில் கைவினைப்பொருளை வைத்து உங்கள் படைப்புக் கதையை பேசுங்கள்',
    cameraLive: 'நேரடி கேமரா காட்சி',
    takePhoto: 'புகைப்படம் எடுக்கவும்',
    switchCamera: 'கேமராவை மாற்றவும்',
    recordVoice: 'கதையை பேச அழுத்தவும்',
    recordingVoice: 'கேட்கிறோம்... (இயல்பாக பேசுங்கள்)',
    stopRecording: 'குரல் பதிவைச் சேமி',
    voicePromptHelp: 'பேசவும்: "இயற்கை சாயமிட்டு 3 நாட்கள் இந்த பட்டுப் புடவையை நெய்தேன்..."',
    voiceNoteSaved: 'குரல் பதிவு வெற்றிகரமாக சேமிக்கப்பட்டது!',
    samplePresets: 'அல்லது மாதிரி கைவினைப்பொருளைத் தேர்வு செய்யவும்:',
    craftBanarasi: 'வாரணாசி ஜரி புடவை',
    craftPottery: 'பாங்குரா சுடுமண் குதிரை',
    craftBidri: 'பித்ரிவேர் வெள்ளி வேலைப்பாடு பெட்டி',
    craftPashmina: 'காஷ்மீரி கைத்தறி பஷ்மினா',

    studioHeadline: 'AI புகைப்பட அரங்கம்',
    studioSubheadline: 'உடனடி பின்னணி நீக்கம் மற்றும் AI அழகிய பின்னணி வடிவமைப்பு',
    original: 'பட்டறையின் அசல் புகைப்படம்',
    cutout: 'ஸ்டுடியோ கட்அவுட் (பின்னணி நீக்கப்பட்டது)',
    chipWhite: 'சுத்தமான ஸ்டுடியோ வெள்ளை',
    chipLoom: 'பாரம்பரிய தறி பட்டறை',
    chipPavilion: 'அரச பாரம்பரிய மண்டபம்',
    generatingBackdrop: 'AI வாழ்க்கைமுறை பின்னணியை உருவாக்குகிறது...',
    proceedToCatalog: 'Catalog AI ஆய்வு செய்க →',

    catalogHeadline: 'Catalog AI பார்வை பகுப்பாய்வு',
    catalogSubheadline: 'பாரம்பரிய உண்மைத்தன்மை மற்றும் இருமொழி விவரக்குறிப்பு',
    analyzingGemini: 'Catalog AI நெசவு மற்றும் உங்கள் குரலை பகுப்பாய்வு செய்கிறது...',
    craftTitle: 'தயாரிப்பு தலைப்பு',
    craftStory: 'இருமொழி கைவினை மரபுக் கதை',
    detectedMaterials: 'கண்டறியப்பட்ட இயற்கை பொருட்கள்',
    authenticityBadge: 'GI முத்திரை & உண்மைத்தன்மை சான்று',
    hsnCode: 'பரிந்துரைக்கப்பட்ட ONDC / HSN குறியீடு',
    proceedToPricing: 'விலை நிர்ணயத்திற்குச் செல்லவும் →',

    pricingHeadline: 'டைனமிக் நியாய ஊதிய கால்குலேட்டர்',
    pricingSubheadline: 'இடைத்தரகர்கள் இல்லாத 100% நியாயமான வாழ்வாதார ஊதியம்',
    materialCost: 'மூலப்பொருள் செலவு',
    craftHours: 'உழைத்த நேரம் (மணிநேரம்)',
    hourlyWage: 'ஒரு மணி நேர ஊதியம் (₹)',
    logisticsCost: 'பேக்கிங் & ONDC சரக்கு கட்டணம்',
    profitMargin: 'கைவினைஞர் லாபம் (%)',
    totalOndcPrice: 'நியாயமான ONDC சில்லறை விலை',
    artisanNetTakeHome: 'உங்கள் நேரடி நிகர வருவாய்',
    benchmarksTitle: 'சந்தை வருவாய் ஒப்பீடு',
    amazonBenchmark: 'அமேசான் காரிகர் (~35% கமிஷன் + விளம்பரம்)',
    flipkartBenchmark: 'பிளிப்கார்ட் சமார்த் (குறைந்தபட்ச வரம்பு)',
    luxuryBenchmark: 'ஏற்றுமதி சில்லறை விலை',
    karidootTakehome: 'காரிதூத் நேரடி ONDC (0% கமிஷன்)',
    proceedToExport: 'பொருளை விநியோகிக்கவும் →',

    exportHeadline: 'பல-சேனல் விநியோகம்',
    exportSubheadline: 'Beckn v1.2.0 JSON, CSV மற்றும் வாட்ஸ்அப் நேரடி விற்பனை',
    deployOndc: 'Beckn v1.2.0 JSON பதிவிறக்குக',
    deployCsv: 'Flipkart / Amazon CSV பதிவிறக்குக',
    shareWhatsapp: 'வாட்ஸ்அப்பில் UPI இணைப்பு பகிரவும்',
    ondcPayloadPreview: 'ONDC Beckn நெறிமுறை JSON முன்னோட்டம்',
    copyJson: 'JSON நகலெடுக்கவும்',
    jsonCopied: 'JSON நகலெடுக்கப்பட்டது!',
    whatsappMessageSent: 'நேரடி UPI கட்டண இணைப்புடன் பகிரத் தயார்!',

    testOrderBtn: 'புதிய ONDC ஆர்டரை சோதிக்கவும்',
    spokenOrderAnnouncement: 'பெங்களூரிலிருந்து இளஞ்சிவப்பு கைத்தறி துண்டுக்காக 1 புதிய ஆர்டர் வந்துள்ளது.',
    pickupModalTitle: 'புதிய ONDC பார்சல் எச்சரிக்கை',
    courierPartner: 'ஒதுக்கப்பட்ட டெலிவரி நிறுவனம்',
    pickupTime: 'எதிர்பார்க்கப்படும் பிக்கப் நேரம்',
    acceptPickup: 'பிக்கப்பை ஏற்கவும்',
    rejectPickup: 'நிராகரி / மாற்றி அமை',
    pickupAccepted: 'பிக்கப் திட்டமிடப்பட்டது! கண்காணிப்பு எண் உருவாக்கப்பட்டது.',

    marketplaceHeadline: 'ONDC சான்றளிக்கப்பட்ட கைவினைச் சந்தை',
    marketplaceSubheadline: 'கிராமப்புற நெசவாளர்களிடமிருந்து நேரடியாக 100% அசல் பொருட்கள்',
    searchCrafts: 'கைத்தறி புடவைகள், சுடுமண் சிலைகள், பித்தளை பொருட்கள் தேடுக...',
    allCategories: 'அனைத்து கைவினைகளும்',
    textiles: 'ஆடைகள் & கைத்தறி',
    pottery: 'சுடுமண் & மண்பாண்டங்கள்',
    metalcraft: 'உலோகக் கலை & வேலைப்பாடுகள்',
    woodcraft: 'மரச் சிற்பங்கள்',
    craftYears: 'ஆண்டுகள் பாரம்பரியம்',
    giCertified: 'GI குறியீடு சான்றளிக்கப்பட்டது',
    handloomMark: 'கைத்தறி முத்திரை',
    viewDetails: 'கதையைப் படித்து வாங்கவும்',
    buyViaOndc: 'ONDC மூலம் நேரடியாக வாங்கவும்',
    addedByArtisan: 'புதிதாக சேர்க்கப்பட்டது',

    reviewsTitle: 'வாடிக்கையாளர் மதிப்புரைகள் & படங்கள்',
    writeReview: 'உங்கள் கருத்தைப் பகிரவும்',
    buyerPhotoUpload: 'வாங்கிய பொருளின் படத்தைப் பதிவேற்றவும்',
    submitReview: 'மதிப்புரையைச் சமர்ப்பிக்கவும்',
    verifiedBuyer: 'சரிபார்க்கப்பட்ட ONDC வாங்குபவர்',

    trackerTitle: 'ONDC நேரடி டெலிவரி கண்காணிப்பு',
    stage1: 'ஆர்டர் உறுதி செய்யப்பட்டது',
    stage2: 'பட்டறையில் கைவினைக் கலைஞரால் உருவாக்கப்படுகிறது',
    stage3: 'பயணத்தில் உள்ளது (சரக்கு நிறுவனம் ஒதுக்கப்பட்டது)',
    stage4: 'டெலிவரி செய்யப்படுகிறது',
    simulateNextStage: 'அடுத்த கட்டத்தை சோதிக்கவும்',
    deliveryPartner: 'டெலிவரி நிறுவனம்',
    becknTxnId: 'பெக்ன் பரிவர்த்தனை எண்',
    estArrival: 'எதிர்பார்க்கப்படும் வருகை',
  },

  bn: {
    appTitle: 'কারীদূত AI',
    appSubtitle: 'গ্রামীণ কারিগরদের ONDC ডিজিটাল সেতুবন্ধন',
    sellerRole: 'কারিগর স্টুডিও (বিক্রেতা)',
    buyerRole: 'ONDC মার্কেটপ্লেস (ক্রেতা)',
    audioGuide: 'নির্দেশিকা শুনুন',
    audioSpeaking: 'অডিও চলছে...',
    audioStopped: 'নির্দেশিকা শুনুন',
    skipIntro: 'এড়িয়ে যান →',

    tourStep1Title: '১. ছবি তুলুন ও কথা বলুন',
    tourStep1Desc: 'ভালো আলোতে আপনার হস্তশিল্পের ছবি তুলুন এবং তার গল্প মুখে বলুন।',
    tourStep2Title: '২. ন্যায্য পারিশ্রমিক নির্ধারণ করুন',
    tourStep2Desc: 'উপকরণ এবং শ্রমের ঘণ্টার সঠিক মূল্যায়ন করে ন্যায্য মজুরি নিশ্চিত করুন।',
    tourStep3Title: '৩. ONDC এবং হোয়াটসঅ্যাপে বিক্রি করুন',
    tourStep3Desc: 'বেকন প্রোটোকল ক্যাটালগ ডাউনলোড করুন এবং সরাসরি UPI অর্ডারের সুবিধা নিন।',
    next: 'পরবর্তী',
    previous: 'পূর্ববর্তী',
    finish: 'শুরু করুন',
    close: 'বন্ধ করুন',

    scanHeadline: 'আপনার শিল্পকর্মের ছবি তুলুন',
    scanSubheadline: 'ক্যামেরার ফ্রেমে শিল্পকর্ম রাখুন এবং নিজের ভাষায় কারুকার্যের গল্প বলুন',
    cameraLive: 'লাইভ ক্যামেরা ভিউফাইন্ডার',
    takePhoto: 'ছবি তুলুন',
    switchCamera: 'ক্যামেরা পরিবর্তন',
    recordVoice: 'গল্প বলতে ট্যাপ করুন',
    recordingVoice: 'শুনছি... (স্বাভাবিকভাবে কথা বলুন)',
    stopRecording: 'ভয়েস নোট সংরক্ষণ করুন',
    voicePromptHelp: 'বলুন: "আমি এই সিল্ক শাড়িটি প্রাকৃতিক নীল দিয়ে ৩ দিনে বুনেছি..."',
    voiceNoteSaved: 'ভয়েস গল্প সংরক্ষিত হয়েছে!',
    samplePresets: 'অথবা একটি নমুনা হস্তশিল্প বেছে নিন:',
    craftBanarasi: 'বারাণসী জরি ব্রোকেড শাড়ি',
    craftPottery: 'বাঁকুড়া পোড়ামাটির ঘোড়া',
    craftBidri: 'বিদ্রিওয়্যার রুপোর নকশা বাক্স',
    craftPashmina: 'কাশ্মীরি হস্তচালিত পশমিনা',

    studioHeadline: 'AI ফটো স্টুডিও ও স্টেজ',
    studioSubheadline: 'এক ক্লিকে ব্যাকগ্রাউন্ড রিমুভ ও AI জেনারেটিভ ঐতিহ্যবাহী পরিবেশ',
    original: 'ওয়ার্কশপের মূল ছবি',
    cutout: 'স্টুডিও কাটআউট (স্বচ্ছ)',
    chipWhite: 'ক্লিন স্টুডিও সাদা',
    chipLoom: 'ঐতিহ্যবাহী তাঁত ঘর',
    chipPavilion: 'রাজকীয় ঐতিহ্য মণ্ডপ',
    generatingBackdrop: 'AI লাইফস্টাইল দৃশ্য তৈরি করছে...',
    proceedToCatalog: 'Catalog AI দিয়ে বিশ্লেষণ করুন →',

    catalogHeadline: 'Catalog AI ভিশন অ্যানালাইসিস',
    catalogSubheadline: 'মাল্টিমোডাল AI দিয়ে সত্যতা, কারুশিল্পের ঐতিহ্য ও দ্বিভাষিক গল্প',
    analyzingGemini: 'Catalog AI বুনন এবং আপনার কণ্ঠস্বর বিশ্লেষণ করছে...',
    craftTitle: 'পণ্যের শিরোনাম',
    craftStory: 'দ্বিভাষিক কারুশিল্প ঐতিহ্য গল্প',
    detectedMaterials: 'শনাক্তকৃত খাঁটি উপাদান',
    authenticityBadge: 'GI ট্যাগ ও সত্যতার প্রমাণ',
    hsnCode: 'প্রস্তাবিত ONDC / HSN কোড',
    proceedToPricing: 'মূল্য নির্ধারণে যান →',

    pricingHeadline: 'ডায়নামিক ন্যায্য-মজুরি ক্যালকুলেটর',
    pricingSubheadline: 'কোনো দালাল কমিশন ছাড়া গ্রামীণ কারিগরদের মর্যাদাশীল উপার্জনের গ্যারান্টি',
    materialCost: 'কাঁচামালের খরচ',
    craftHours: 'কাজের সময় (ঘণ্টা)',
    hourlyWage: 'কারিগর প্রতি ঘণ্টা মজুরি (₹)',
    logisticsCost: 'প্যাকিং ও ONDC কুরিয়ার',
    profitMargin: 'কারিগর মুনাফা (%)',
    totalOndcPrice: 'ন্যায্য ONDC খুচরা মূল্য',
    artisanNetTakeHome: 'আপনার সরাসরি নিট আয়',
    benchmarksTitle: 'মার্কেটপ্লেস উপার্জনের তুলনা',
    amazonBenchmark: 'অ্যামাজন কারিগর (~৩৫% কমিশন + বিজ্ঞাপন)',
    flipkartBenchmark: 'ফ্লিপকার্ট সমর্থ (ন্যূনতম স্তর)',
    luxuryBenchmark: 'রপ্তানি খুচরা মূল্য',
    karidootTakehome: 'কারীদূত সরাসরি ONDC (০% কমিশন)',
    proceedToExport: 'পণ্য বিতরণ ও রপ্তানি করুন →',

    exportHeadline: 'মাল্টি-চ্যানেল বিতরণ ব্যবস্থা',
    exportSubheadline: 'যাচাইকৃত Beckn v1.2.0 JSON, CSV স্প্রেডশিট ও হোয়াটসঅ্যাপ ডাইরেক্ট',
    deployOndc: 'Beckn v1.2.0 JSON ডাউনলোড করুন',
    deployCsv: 'Flipkart / Amazon CSV ডাউনলোড করুন',
    shareWhatsapp: 'হোয়াটসঅ্যাপে UPI লিঙ্ক পাঠান',
    ondcPayloadPreview: 'ONDC Beckn প্রোটোকল JSON প্রিভিউ',
    copyJson: 'JSON কপি করুন',
    jsonCopied: 'JSON কপি হয়েছে!',
    whatsappMessageSent: 'সরাসরি UPI পেমেন্ট লিঙ্কের সাথে শেয়ারের জন্য প্রস্তুত!',

    testOrderBtn: 'নতুন ONDC অর্ডার পরীক্ষা করুন',
    spokenOrderAnnouncement: 'বেঙ্গালুরু থেকে গোলাপি তাঁতের তোয়ালের জন্য আপনার ১টি নতুন অর্ডার এসেছে।',
    pickupModalTitle: 'নতুন ONDC ডেলিভারি অ্যালার্ট',
    courierPartner: 'নির্ধারিত কুরিয়ার পার্টনার',
    pickupTime: 'সম্ভাব্য পিকআপের সময়',
    acceptPickup: 'কুরিয়ার পিকআপ গ্রহণ করুন',
    rejectPickup: 'বাতিল / সময় পরিবর্তন',
    pickupAccepted: 'কুরিয়ার পিকআপ বুক হয়েছে! ট্র্যাকিং আইডি তৈরি হয়েছে।',

    marketplaceHeadline: 'ONDC যাচাইকৃত কারুশিল্পের বাজার',
    marketplaceSubheadline: 'সরাসরি গ্রামীণ তাঁতিদের কাছ থেকে ১০০% খাঁটি হস্তনির্মিত পণ্য',
    searchCrafts: 'তাঁতের শাড়ি, পোড়ামাটি, পিতলের কারুশিল্প খুঁজুন...',
    allCategories: 'সকল শিল্প',
    textiles: 'বস্ত্র ও তাঁতশিল্প',
    pottery: 'পোড়ামাটি ও মৃৎশিল্প',
    metalcraft: 'ধাতুশিল্প ও ফিলিগ্রি',
    woodcraft: 'দারুশিল্প (কাঠের কাজ)',
    craftYears: 'বছরের ঐতিহ্য',
    giCertified: 'GI ট্যাগ প্রত্যয়িত',
    handloomMark: 'হ্যান্ডলুম মার্ক',
    viewDetails: 'গল্প পড়ুন ও কিনুন',
    buyViaOndc: 'ONDC মারফত সরাসরি কিনুন',
    addedByArtisan: 'স্টুডিওতে নতুন যোগ হয়েছে',

    reviewsTitle: 'ক্রেতাদের মতামত ও ছবি',
    writeReview: 'আপনার মতামত লিখুন',
    buyerPhotoUpload: 'প্রাপ্ত পণ্যের ছবি যোগ করুন',
    submitReview: 'পর্যালোচনা জমা দিন',
    verifiedBuyer: 'যাচাইকৃত ONDC ক্রেতা',

    trackerTitle: 'ONDC রিয়েল-টাইম ডেলিভারি ট্র্যাকার',
    stage1: 'অর্ডার নিশ্চিত করা হয়েছে',
    stage2: 'ওয়ার্কশপে কারিগরের হাতে তৈরি হচ্ছে',
    stage3: 'যাত্রাপথে (কুরিয়ার পার্টনার নির্ধারিত)',
    stage4: 'ডেলিভারির পথে (Out for Delivery)',
    simulateNextStage: 'পরবর্তী ধাপ পরীক্ষা করুন',
    deliveryPartner: 'ডেলিভারি পার্টনার',
    becknTxnId: 'বেকন লেনদেন আইডি',
    estArrival: 'সম্ভাব্য পৌঁছানোর সময়',
  },

  mr: {
    appTitle: 'कारीदूत AI',
    appSubtitle: 'ग्रामीण कारागिरांचा ONDC डिजिटल सेतू',
    sellerRole: 'कारागीर स्टुडिओ (विक्रेता)',
    buyerRole: 'ONDC बाजारपेठ (ग्राहक)',
    audioGuide: 'मार्गदर्शिका ऐका',
    audioSpeaking: 'आवाज वाजत आहे...',
    audioStopped: 'मार्गदर्शिका',
    skipIntro: 'पुढे जा →',

    tourStep1Title: '१. फोटो काढा आणि बोलून सांगा',
    tourStep1Desc: 'चांगल्या प्रकाशात हस्तकलेचा फोटो काढा आणि त्याची वैशिष्ट्ये बोलून नोंदवा.',
    tourStep2Title: '२. योग्य मेहनताना ठरवा',
    tourStep2Desc: 'कच्चा माल आणि कामाचे तास यांनुसार योग्य मोबदला सहज निश्चित करा.',
    tourStep3Title: '३. ONDC आणि व्हॉट्सअ‍ॅपवर विका',
    tourStep3Desc: 'बेकन प्रोटोकॉल कॅटलॉग डाउनलोड करा आणि थेट UPI पेमेंटद्वारे विक्री करा.',
    next: 'पुढे',
    previous: 'मागे',
    finish: 'सुरू करा',
    close: 'बंद करा',

    scanHeadline: 'आपल्या हस्तकलेचे छायाचित्र घ्या',
    scanSubheadline: 'कॅमेऱ्याच्या चौकटीत वस्तू ठेवा आणि आपल्या भाषेत कलाकृतीची कथा सांगा',
    cameraLive: 'थेट कॅमेरा दृश्य',
    takePhoto: 'फोटो काढा',
    switchCamera: 'कॅमेरा बदला',
    recordVoice: 'कथा बोलण्यासाठी दाबा',
    recordingVoice: 'ऐकत आहोत... (सहजपणे बोला)',
    stopRecording: 'आवाज जतन करा',
    voicePromptHelp: 'बोला: "मी ही पैठणी साडी नैसर्गिक रंगांनी ३ दिवसांत विणली आहे..."',
    voiceNoteSaved: 'आवाज यशस्वीरीत्या जतन केला गेला!',
    samplePresets: 'किंवा नमुना हस्तकला निवडा:',
    craftBanarasi: 'वाराणसी जरी ब्रोकेड साडी',
    craftPottery: 'बांकुरा टेराकोटा अश्व मूर्ती',
    craftBidri: 'बिद्रीवेअर चांदी कोरीव डबा',
    craftPashmina: 'काश्मिरी हातमाग पश्मिना',

    studioHeadline: 'AI फोटो स्टुडिओ',
    studioSubheadline: 'एका क्लिकवर बॅकग्राउंड काढा आणि AI द्वारे सुंदर देखावा तयार करा',
    original: 'कार्यशाळेतील मूळ फोटो',
    cutout: 'स्टुडिओ कटआउट (पारदर्शक)',
    chipWhite: 'स्वच्छ स्टुडिओ पांढरा',
    chipLoom: 'पारंपरिक हातमाग पार्श्वभूमी',
    chipPavilion: 'शाही वारसा मंडप',
    generatingBackdrop: 'AI जीवनशैली दृश्य तयार करत आहे...',
    proceedToCatalog: 'Catalog AI द्वारे विश्लेषण करा →',

    catalogHeadline: 'Catalog AI दृष्टी विश्लेषण',
    catalogSubheadline: 'मल्टीमॉडल AI द्वारे अस्सलता, हस्तकला वारसा आणि द्विभाषिक कथा',
    analyzingGemini: 'Catalog AI विणकाम आणि आवाजाचे विश्लेषण करत आहे...',
    craftTitle: 'उत्पादनाचे नाव',
    craftStory: 'द्विभाषिक हस्तकला वारसा कथा',
    detectedMaterials: 'ओळखलेले अस्सल साहित्य',
    authenticityBadge: 'GI टॅग व अस्सलता प्रमाणपत्र',
    hsnCode: 'शिफारस केलेला ONDC / HSN कोड',
    proceedToPricing: 'किंमत निश्चितीकडे जा →',

    pricingHeadline: 'गतिशील योग्य-मजुरी कॅल्क्युलेटर',
    pricingSubheadline: 'शून्य दलाली कमिशनसह सन्मानपूर्वक उपजीविकेची खात्री',
    materialCost: 'कच्च्या मालाचा खर्च',
    craftHours: 'कामाचे तास',
    hourlyWage: 'कारागिराची ताशी मजुरी (₹)',
    logisticsCost: 'पॅकिंग व ONDC कुरिअर खर्च',
    profitMargin: 'कारागिराचा स्वाभिमान नफा (%)',
    totalOndcPrice: 'योग्य ONDC किरकोळ किंमत',
    artisanNetTakeHome: 'तुमची थेट निव्वळ कमाई',
    benchmarksTitle: 'बाजारपेठ कमाईची तुलना',
    amazonBenchmark: 'अ‍ॅमेझॉन कारिगर (~३५% कमिशन + जाहिरात)',
    flipkartBenchmark: 'फ्लिपकार्ट समर्थ (किमान मर्यादा)',
    luxuryBenchmark: 'निर्यात किरकोळ किंमत',
    karidootTakehome: 'कारीदूत थेट ONDC (०% कमिशन)',
    proceedToExport: 'उत्पादन वितरित आणि निर्यात करा →',

    exportHeadline: 'मल्टी-चॅनेल वितरण',
    exportSubheadline: 'प्रमाणित Beckn v1.2.0 JSON, CSV आणि थेट व्हॉट्सअ‍ॅप विक्री',
    deployOndc: 'Beckn v1.2.0 JSON डाउनलोड करा',
    deployCsv: 'Flipkart / Amazon CSV डाउनलोड करा',
    shareWhatsapp: 'व्हॉट्सअ‍ॅपवर UPI लिंक पाठवा',
    ondcPayloadPreview: 'ONDC Beckn प्रोटोकॉल JSON पूर्वावलोकन',
    copyJson: 'JSON कॉपी करा',
    jsonCopied: 'JSON कॉपी झाले!',
    whatsappMessageSent: 'थेट UPI पेमेंट लिंकसह शेअर करण्यासाठी सज्ज!',

    testOrderBtn: 'नवीन ONDC ऑर्डर तपासा',
    spokenOrderAnnouncement: 'बंगळुरूहून गुलाबी हँडलूम टॉवेलसाठी आपल्याकडे १ नवीन ऑर्डर आली आहे.',
    pickupModalTitle: 'नवीन ONDC डिलिव्हरी अलर्ट',
    courierPartner: 'नियुक्त लॉजिस्टिक भागीदार',
    pickupTime: 'अंदाजे पिकअप वेळ',
    acceptPickup: 'कुरिअर पिकअप स्वीकारा',
    rejectPickup: 'नाकारा / वेळ बदला',
    pickupAccepted: 'कुरिअर पिकअप नियोजित झाले! ट्रॅकिंग आयडी तयार झाला.',

    marketplaceHeadline: 'ONDC प्रमाणित हस्तकला बाजारपेठ',
    marketplaceSubheadline: 'थेट ग्रामीण विणकरांकडून १००% अस्सल हस्तनिर्मित कलाकृती',
    searchCrafts: 'हातमाग साड्या, टेराकोटा, पितळेच्या वस्तू शोधा...',
    allCategories: 'सर्व हस्तकला',
    textiles: 'वस्त्रे आणि हातमाग',
    pottery: 'मातीची भांडी व शिल्पे',
    metalcraft: 'धातूकाम व कलाकुसर',
    woodcraft: 'लाकडी कोरीव काम',
    craftYears: 'वर्षांची परंपरा',
    giCertified: 'GI टॅग प्रमाणित',
    handloomMark: 'हँडलूम मार्क',
    viewDetails: 'कलाकथा वाचा आणि खरेदी करा',
    buyViaOndc: 'ONDC द्वारे थेट खरेदी करा',
    addedByArtisan: 'स्टुडिओत नवीन जोडले',

    reviewsTitle: 'ग्राहकांचे अभिप्राय आणि फोटो',
    writeReview: 'आपला अभिप्राय नोंदवा',
    buyerPhotoUpload: 'मिळालेल्या उत्पादनाचा फोटो जोडा',
    submitReview: 'अभिप्राय सबमिट करा',
    verifiedBuyer: 'प्रमाणित ONDC ग्राहक',

    trackerTitle: 'ONDC रिअल-टाइम डिलिव्हरी ट्रॅकिंग',
    stage1: 'ऑर्डर नोंदवली आणि ONDC द्वारे पुष्टी',
    stage2: 'कारागिराच्या कार्यशाळेत तयार होत आहे',
    stage3: 'मार्गावर आहे (लॉजिस्टिक भागीदार नियुक्त)',
    stage4: 'डिलिव्हरीसाठी बाहेर पडले (Out for Delivery)',
    simulateNextStage: 'पुढील टप्पा तपासा',
    deliveryPartner: 'डिलिव्हरी पार्टनर',
    becknTxnId: 'बेकन व्यवहार आयडी',
    estArrival: 'अंदाजे आगमन',
  }
};

const LanguageContext = createContext();

export const STAGE_AUDIO_SCRIPTS = {
  scanner: "Namaste. Please take a clear photo of your handmade craft in good natural light. Make sure the entire product and its weave texture are clearly visible inside the frame.",
  voice: "Now, press the orange microphone button and speak in your mother tongue. Tell the story of your craft, the materials you used, and how long it took you to create it.",
  studio: "We have staged your craft on clean, natural Carrara marble. Slide the divider left and right to inspect the before and after, then click next to generate your catalog.",
  catalog: "Catalog AI has analyzed your craft, verified its GI tag authenticity, and prepared your multilingual product description.",
  cataloger: "Catalog AI has analyzed your craft, verified its GI tag authenticity, and prepared your multilingual product description.",
  pricing: "This is your fair living wage calculation. It guarantees you are paid fairly for your labor, raw materials, and heritage skill.",
  export: "Congratulations! Your craft is ready. Click publish to list your product directly on the ONDC open network for buyers across India.",
  marketplace: "Welcome to KariDoot ONDC Marketplace. Discover authentic GI-tagged crafts directly from verified Indian artisan clusters with fair wage transparency."
};

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('karidoot_lang') || 'en';
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(() => {
    return localStorage.getItem('karidoot_audio_muted') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('karidoot_lang', currentLang);
  }, [currentLang]);

  useEffect(() => {
    localStorage.setItem('karidoot_audio_muted', isAudioMuted ? 'true' : 'false');
  }, [isAudioMuted]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const toggleAudioMute = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsAudioMuted((prev) => {
      const next = !prev;
      localStorage.setItem('karidoot_audio_muted', next ? 'true' : 'false');
      return next;
    });
  };

  // Translation helper
  const t = (key) => {
    const langDict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  // Text to Speech helper with fallback
  const speakText = (text, onEnd) => {
    if (isAudioMuted) {
      return;
    }
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const activeLangConfig = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
      utterance.lang = activeLangConfig.speechCode;
      utterance.rate = 0.9; // Rate = 0.9 (slightly slower, clear cadence so rural artisans can understand comfortably)
      utterance.pitch = 1.0;

      // Try matching preferred Indian accent voice if available
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find(v => 
        v.lang === activeLangConfig.speechCode || 
        v.lang.replace('_', '-') === activeLangConfig.speechCode ||
        (activeLangConfig.speechCode === 'en-IN' && (v.lang.startsWith('en-IN') || v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('hindi') || v.name.toLowerCase().includes('ravi') || v.name.toLowerCase().includes('heera'))) ||
        v.lang.startsWith(activeLangConfig.speechCode.slice(0, 2))
      );
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false);
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis error:', e);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <LanguageContext.Provider value={{
      currentLang,
      setCurrentLang,
      t,
      languages: LANGUAGES,
      speakText,
      stopSpeaking,
      isSpeaking,
      isAudioMuted,
      setIsAudioMuted,
      toggleAudioMute,
      stageAudioScripts: STAGE_AUDIO_SCRIPTS
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
