// StealthRDP Homepage UI/UX Implementation (.mdc)

## Purpose
Design the homepage to immediately communicate value, build trust, and guide visitors toward purchase—using only the approved design tokens.

---

## 1. Layout & Grid
- **Container:** max-width 1280px, centered  
- **Grid:** 12-column layout, 24px gutter  
- **Spacing:** use 8px base unit; margins/padding in multiples of 8px  
- **Breakpoints:**  
  - Mobile: <640px (single column)  
  - Tablet: 640–1024px (6/12 columns)  
  - Desktop: >1024px (12/12 columns)

---

## 2. Hero Section (Above the Fold)
- **Background:** Steel Gray (`#1E1E1E`) full-bleed  
- **Padding:** 64px top / 64px bottom  
- **Columns:**  
  - Left (6 columns): Text & CTAs  
  - Right (6 columns): Illustration or product screenshot  
- **Headline:**  
  - Font: Montserrat Bold  
  - Size/Leading: 48px/56px  
  - Color: Electric Cyan (`#00F0FF`)  
- **Sub-headline:**  
  - Font: Poppins 400  
  - Size/Leading: 18px/24px  
  - Color: `#FFFFFF` @ 80% opacity  
  - Margin-top: 16px  
- **Primary CTA:**  
  - Text: “Get Started”  
  - BG: Cyber Green (`#22D46B`)  
  - Text: Midnight Blue (`#0B0F2D`)  
  - Font: Montserrat Bold 16px/24px  
  - Padding: 16px 32px  
  - Radius: 8px  
  - Margin-right: 16px  
- **Secondary CTA:**  
  - Text: “Learn More”  
  - Border: 1px solid Electric Cyan (`#00F0FF`)  
  - Text Color: Electric Cyan (`#00F0FF`)  
  - Font: Poppins 16px/24px  
  - Padding: 16px 32px  
  - Radius: 8px  
- **Illustration/Image:**  
  - Width: 100% of its column  
  - Alt text: descriptive for accessibility  

---

## 3. Benefits Snapshot (Mid-Page)
- **Section Padding:** 64px top / 64px bottom  
- **Background:** Midnight Blue (`#0B0F2D`)  
- **Columns:** 3-column grid  
- **Each Benefit Card:**  
  - Icon: 32x32px, stroke 2px, Electric Cyan or Cyber Green  
  - Title: Montserrat Bold 20px/28px, `#FFFFFF`  
  - Description: Poppins 16px/24px, `#FFFFFF` @ 80%  
  - Margin-bottom: 32px  

---

## 4. Social Proof
- **Section Padding:** 64px top / 32px bottom  
- **Background:** Steel Gray (`#1E1E1E`)  
- **Client Logos:**  
  - Monochrome, max-height 40px, spaced in 6-column grid  
- **Testimonial Carousel:**  
  - Card BG: Charcoal (`#101224`), radius 8px, padding 24px  
  - Quote Icon: Electric Cyan, 24px  
  - Text: Poppins 16px/24px, `#FFFFFF`  
  - Author: Montserrat Semi-Bold 14px/16px, `#FFFFFF` @ 80%

---

## 5. Feature Details
- **Section Padding:** 64px top / 64px bottom  
- **Layout:** Alternating image/text rows  
  - Image: 6 columns  
  - Text: 6 columns  
- **Feature Title:** Montserrat Bold 28px/36px, Electric Cyan  
- **Feature Text:** Poppins 16px/24px, `#FFFFFF` @ 80%  
- **CTA Inline:** “Learn More” link in Electric Cyan with underline on hover

---

## 6. Limited-Time Offer
- **Background:** Cyber Green (`#22D46B`)  
- **Padding:** 48px top / 48px bottom  
- **Text:** Montserrat Bold 28px/36px, Midnight Blue (`#0B0F2D`)  
- **Countdown Timer:** Poppins Bold 24px/32px, Midnight Blue  
- **CTA:** “Claim Offer” button styled as Primary CTA  

---

## 7. Final CTA Section
- **Background:** Midnight Blue (`#0B0F2D`)  
- **Padding:** 64px top / 64px bottom  
- **Headline:** Montserrat Bold 36px/44px, Electric Cyan  
- **Sub-text:** Poppins 16px/24px, `#FFFFFF` @ 80%  
- **Primary CTA:** as defined above, centered  

---

## 8. Footer
- **Background:** Charcoal (`#101224`)  
- **Padding:** 48px top / 48px bottom  
- **Link Groups:** 4 columns, Poppins 14px/20px, `#FFFFFF` @ 80%  
- **Social Icons:** 24px stroke icons in Electric Cyan  
- **Copyright:** Poppins Caption 12px/16px, `#FFFFFF` @ 60%  

---

## Enforcement & Review
- Use semantic HTML tied to token variables (e.g. `$color-electric-cyan`, `$font-h1`).  
- Automated linting must flag any hard-coded values.  
- Include a homepage token-audit in every PR.  
- No merge until design token compliance is confirmed.
