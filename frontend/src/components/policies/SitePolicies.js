import React from "react";
import styled from "styled-components";

const StyledPolicies = styled.section`
  background: #fff;

  ul.default__list > li {
    list-style-type: none;
  }

  .policies__wrapper {
    padding: 40px;
    max-width: 850px;
    margin: 0 auto;
    text-align: left;
    h2 {
      margin-bottom: 4%;
    }
    p {
      color: #082487;
      font-size: 14px;
    }
    span.underline {
      text-decoration: underline;
    }
    ol.disk {
      list-style-type: disc;
      font-size: 14px;
      padding-bottom: 0.6em;
    }
    ol.enum {
      margin: 0;
      padding: 0;
      padding-bottom: 0.6em;
      margin-left: 1.2em;
    }
    ol.enum > li {
      display: table;
      margin-bottom: 0.6em;
      font-size: 14px;

      &:before {
        display: table-cell;
        padding-right: 0.6em;
        content: "";
      }
    }
    ol.enum {
      list-style-type: none;
      counter-reset: item;
    }
    ol.enum > li {
      display: table;
      counter-increment: item;

      &:before {
        content: counters(item, ".") ". ";
      }
    }
  }
`;

function SitePolicies(props) {
  return (
    <StyledPolicies>
      <div className="container">
        <div className="policies__wrapper">
          <h2>
            <small>Last updated January 1st, 2020</small>
          </h2>
          <ul className="default__list">
            <li>
              <p>
                HOMEMUSE, LLC (“HOMEMUSE” or “we” or “us” or “our”) recognizes
                the need to protect the privacy of the personal information you
                provide to HOMEMUSE with respect to your access and use of our
                website www.homemuse.io and various related services
                (collectively, the “Site”).
              </p>
            </li>
            <li>
              <p>
                Therefore, we have adopted this privacy policy (the “Privacy
                Policy”), which sets forth, among other things, the type of
                information that will be collected, the purpose and use of the
                collected information, and your rights with regard to the
                collected information. This Privacy Policy governs how we
                collect and use your personal information wherever you use our
                Site. By accessing the Site, you are consenting to the
                collection and the use of your information by us, but only to
                the extent described herein. Should you wish to revoke your
                consent, you may do so by contacting us, information on which is
                set out in the Privacy Policy below.
              </p>
            </li>
            <li>
              <p>
                HOMEMUSE may make modifications, deletions and/or additions to
                this Privacy Policy (“Changes”) at any time. Changes will be
                effective: (i) thirty (30) days after HOMEMUSE provides notice
                of the Changes, whether such notice is provided through the Site
                user interface, is sent to the email address associated with
                your account or otherwise; or (ii) when you opt-in or otherwise
                expressly agree to the Changes or a version of this Privacy
                Policy incorporating the Changes, whichever comes first.
              </p>
            </li>
            <li>
              <p>
                <b>Protection of Your Information</b>
              </p>
              <p>
                When we collect or use your information, we will utilize
                commercially reasonable safeguards to ensure its protection. It
                should be noted that no security procedure is currently 100%
                effective. Should any breach of your Personal Information occur,
                we will inform you as soon as reasonably possible, as required
                by applicable law.
              </p>
            </li>
            <li>
              <p>
                <b>Type and Purpose of Collection</b>
              </p>
              <p>
                We collect information at various points in the Site to
                facilitate its use by our users. Specifically, two types of
                information are collected:
              </p>
              <ol className="enum">
                <li>
                  <span className="underline">Non-Personal Information:</span>{" "}
                  Upon accessing the Site, certain non-personal information will
                  be automatically collected without your knowledge or consent,
                  such as your IP address, location data (where you log in
                  through the Site you will be asked if you consent to the Site
                  accessing your location, which can be updated at any time in
                  your device settings) and the referring website (“Non-Personal
                  Information”). We use Non-Personal Information to examine our
                  traffic and to view how our users use the Site. This type of
                  information will not allow you to be personally identified
                  although we might be able to associate it with your account.
                  For example, we use “cookies,” which contain only certain
                  statistical information. For more information on cookies
                  please find more information below.
                </li>
                <li>
                  <span className="underline">
                    Identifying Personal Information:
                  </span>{" "}
                  If you initiate a transaction through the Site, we may collect
                  and store information about you, such as your name,
                  demographic information, phone number, address, and email, as
                  well as any other information you provide to us (“Personal
                  Information”), in order to facilitate you using the Site, send
                  communications about the Site and related services, and
                  populate forms for future transactions. This information may
                  be shared with third parties for the same purposes. We may
                  also, with your consent, post demographic information on the
                  Site in relation to content you have submitted. HOMEMUSE does
                  not disclose your Personal Information to third parties for
                  the purpose of directly marketing their services to you unless
                  you first agree to such disclosure.
                </li>
                <li>
                  <span className="underline">
                    Contact Data, Metadata, and Data for Interactions:
                  </span>{" "}
                  To provide the Site, we may also collect e-mail addresses,
                  phone numbers, text notes about customers entered by end
                  users, related customers and organizations, business
                  addresses, titles/positions, and other similar contact data,
                  along with metadata of emails (times sent, etc.) that are
                  linked to Personal Information, messages on Slack, location,
                  and metadata about calls and meetings (timing, participants,
                  etc.) that are linked to Personal Information.
                </li>
              </ol>
            </li>
            <li>
              <p>
                Additionally, Personal Information may be used and disclosed to
                the extent HOMEMUSE may deem reasonably necessary to enforce the
                terms of any agreement between you and HOMEMUSE, or to protect
                the rights, property or safety of any person or entity.
              </p>
            </li>
            <li>
              <p>
                Any of the information we collect from you may be used in one of
                the following ways:
              </p>
              <ol className="disk">
                <li>
                  To provide customer relationship management services to you.
                  We process personal data as necessary to perform these
                  services. In addition to storing and retrieving data, we carry
                  out necessary processing to generate reports and insights of
                  your interactions with your customers on your behalf.
                </li>
                <li>
                  To personalize your experience (your information helps us to
                  better respond to your individual needs)
                </li>
                <li>
                  To improve our website (we continually strive to improve our
                  service based on the information and feedback we receive from
                  you)
                </li>
                <li>
                  To improve customer service (your information helps us to more
                  effectively respond to your customer service and support
                  needs)
                </li>
                <li>
                  To provide to education and similar institutions (who may at
                  times be interested in offering you courses or admission based
                  on your performance)
                </li>
              </ol>
            </li>
            <li>
              <p>
                <b>Withdrawal of Consent</b>
              </p>
              <p>
                You may withdraw your consent to the collection of Personal
                Information at any time by sending an email to us. Upon
                receiving notice that you have revoked your consent, we will
                stop using your Personal Information within a reasonable time,
                which will vary depending on what information we have collected
                and for what purpose. Please note that we will send you an email
                confirmation upon receipt of your request. Therefore, if you do
                not receive a confirmation email, please contact us again with
                your request. If you do choose to withdraw such consent, your
                access to the Site may be diminished, or your ability to choose
                some of the options on the Site may be limited.
              </p>
              <p>Contact email: support@homemuse.io</p>
            </li>
            <li>
              <p>
                <b>Sharing Information</b>
              </p>
              <p>
                We will not sell, rent or disclose to outside parties the
                information we collect and save except that we may share the
                collected information with other parties as follows:
              </p>
              <ol className="enum">
                <li>
                  <u>Affiliated Site Providers:</u> We have agreements with
                  various affiliated service providers to facilitate the
                  functioning of the Site, with whom we may share the
                  information we have collected. For example, we may share your
                  credit card information with the credit card service provider
                  to process your purchase. All administrative service providers
                  that we use are required to have the same level of privacy
                  protection as we have, and therefore we expect that your
                  information will be handled with the same level of care that
                  we employ. Additionally, for example, we may use analytics
                  services.
                </li>
                <li>
                  <u>Where required by law:</u> We may share the collected
                  information where required by law, specifically in response to
                  a demand from government authorities where such demand meets
                  the legal requirements.
                </li>
                <li>
                  <u>Statistical Analysis:</u> We may share Non-Personal
                  Information and aggregated information with third parties,
                  including but not limited to for advertising or marketing
                  purposes. No Personal Information will be shared in this
                  manner.
                </li>
                <li>
                  <u>Transactions:</u> In connection with, or during
                  negotiations of, any merger, sale of company assets, financing
                  or acquisition, or in any other situation where Personal
                  Information may be disclosed or transferred as one of our
                  business assets.
                </li>
              </ol>
            </li>
            <li>
              <p>
                <b>External Links</b>
              </p>
              <p>
                The Site contains links and references to other websites. We are
                not responsible for the collection, use and disclosure of
                information, or the privacy practices of such websites, and we
                expressly disclaim any liability relating thereto.
              </p>
            </li>
            <li>
              <p>
                <b>Terms of Site</b>
              </p>
              <p>
                This Privacy Policy is incorporated into and forms part of the
                Terms of Site, which outlines the terms and conditions you agree
                to when accessing and using the Site, and which can be found
                here:{" "}
                <a
                  href="http://www.homemuse.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.homemuse.io
                </a>
              </p>
            </li>
            <li>
              <p>
                <b>Children’s Privacy</b>
              </p>
              <p>
                Protecting the privacy of young children is especially
                important. Our Site is not directed to children under the age of
                13, and we do not knowingly collect personal information from
                children under the age of 13 without obtaining parental consent.
                If you are under 13 years of age, then please do not use or
                access the Site at any time or in any manner. If we learn that
                personally identifiable information has been collected on the
                Site from persons under 13 years of age and without verifiable
                parental consent, then we will take the appropriate steps to
                delete this information. If you are a parent or guardian and
                discover that your child under 13 years of age has obtained an
                account on the Site, then you may alert us at
                support@homemuse.io and request that we delete that child’s
                personally identifiable information from our systems.
              </p>
            </li>
            <li>
              <p>
                <b>Cookies and Similar Technologies</b>
              </p>
              <p>
                When you interact with the Site, we try to make that experience
                simple and meaningful. When you use our Site, our web server
                sends a cookie to your computer or mobile device (as the case
                may be). Cookies are small pieces of information which are
                issued to your computer or mobile device (as the case may be)
                when you visit a website or access or use a mobile application
                and which store and sometimes track information about your use
                of a website or application (as the case may be). A number of
                cookies we use last only for the duration of your web session or
                Site session and expire when you close your browser or exit the
                Site. Other cookies are used to remember you when you return to
                the Site and will last for longer.
              </p>
              <p>
                Some of the cookies used by the Site are set by us, and some are
                set by third parties who are delivering services on our behalf.
              </p>
              <p>
                Most web and mobile device browsers automatically accept cookies
                but, if you prefer, you can change your browser to prevent that
                or to notify you each time a cookie is set. You can also learn
                more about cookies by visiting{" "}
                <a
                  href="http://www.allaboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.allaboutcookies.org
                </a>{" "}
                which includes additional useful information on cookies and how
                to block cookies using different types of browser or mobile
                device. Please note, however, that by blocking or deleting
                cookies used on the Site, you may not be able to take full
                advantage of the Site.
              </p>
            </li>
            <li>
              <p>
                <b>California Privacy Rights</b>
              </p>
              <p>
                Pursuant to Section 1798.83 of the California Civil Code, if you
                are a California resident and have an established business
                relationship with HOMEMUSE, you can request a notice disclosing
                the categories of personal information that HOMEMUSE has shared
                with third parties, for the third parties’ direct marketing
                purposes, during the preceding calendar year. To request a
                notice, please submit your request to the address directly
                below.
              </p>
            </li>
            <li>
              <p>
                <b>International Visitors</b>
              </p>
              <p>
                The Site is hosted in the United States and is intended for
                visitors located within the United States. If you choose to use
                the Site from the European Union or other regions of the world
                with laws governing data collection and use that may differ from
                U.S. law, then please note that you are transferring your
                personal information outside of those regions to the United
                States for storage and processing. Also, we may transfer your
                data from the U.S. to other countries or regions in connection
                with storage and processing of data, fulfilling your requests,
                and operating the Site. By providing any information, including
                personal information, on or to the Site, you consent to such
                transfer, storage, and processing. <br /> By using the Site,
                participating in any of our services, and/or providing us with
                your Personal Information, you consent to this transfer. In
                order to comply with the EU-US Privacy Shield and Swiss-US
                Privacy Shield frameworks, the Company commits to the resolution
                of complaints about your privacy and our collection or use of
                your personal information. In compliance with the US-EU and
                Swiss-US Privacy Shield Principles, the Company commits to
                resolve complaints about your privacy and our collection or use
                of your personal information. European Union or Swiss
                individuals with inquiries or complaints regarding this privacy
                policy should first contact HOMEMUSE at: suppot@homemuse.io.
                HOMEMUSE has further committed to refer unresolved privacy
                complaints under the EU-US and Swiss-US Privacy Shield
                Principles to BBB EU PRIVACY SHIELD, a non-profit alternative
                dispute resolution provider located in the United States and
                operated by the Council of Better Business Bureaus. If you do
                not receive timely acknowledgement of your complaint, or if your
                complaint is not satisfactorily addressed, please visit{" "}
                <u>http://www.bbb.org/EU-privacy-shield/for-eu-consumers</u> for
                more information and to file a complaint. Finally, as a last
                resort and in limited situations, EU and Swiss individuals may
                seek redress from the Privacy Shield Panel, a binding
                arbitration mechanism.
              </p>
            </li>
            <li>
              <p>
                <b>International Transfer</b>
              </p>
              <p>
                Both Personal Information and Non-Personal Information you
                submit via the Site is sent to our group companies and will
                processed in the USA and stored on secure servers located in the
                USA. Such information may also be transferred by us to our
                offices and third parties. The countries concerned may not have
                similar data protection laws to your country. Where we transfer
                your information out of your jurisdiction we will take
                reasonable steps to ensure that your privacy rights continue to
                be protected. By submitting your information to the Site, you
                agree to this storing, processing and transfer
              </p>
            </li>
            <li>
              <p>
                <b>
                  For Residents of the European Economic Area (“EEA”) – General
                  Data Protection Regulation (“GDPR”)
                </b>
              </p>
              <p>
                This Privacy Policy describes how HOMEMUSE collects, uses and
                shares your personal information. If you are a resident of the
                EEA, you are subject to the GDPR, and the following terms also
                apply to you. The Company is the Controller and responsible for
                your personal data. <br />{" "}
                <i>Lawful Bases to Process Your Personal Data</i> <br /> This
                Privacy Policy describes above the personal data we collect from
                you and how we use it. We will only use your personal data when
                the law allows us to. Most commonly, we will use your personal
                data in the following circumstances:
              </p>
              <ol className="disk">
                <li>
                  Where we need to perform the contract we are about to enter
                  into or have entered into with you.
                </li>
                <li>
                  Where it is necessary for our legitimate interests (or those
                  of a third party) and your interests and fundamental rights do
                  not override those interests.
                </li>
                <li>
                  Where we need to comply with a legal or regulatory obligation.
                </li>
              </ol>
              <p>
                Generally, we do not rely on consent as a legal basis for
                processing your personal data other than in relation to sending
                third party direct marketing communications to you via email or
                text message.
              </p>
              <p>
                You have the right to withdraw consent to marketing at any time
                by contacting us as at support@homemuse.io. Specifically, we
                have a lawful basis for processing each type of personal data
                described in this Privacy Policy, which are as follows:
              </p>
              <ol className="enum">
                <li>
                  The lawful basis for collecting your Identity and Contact Data
                  to register you as a new customer is the performance of a
                  contract with you.
                </li>
                <li>
                  The lawful bases for collecting your Identity, Contact,
                  Financial, Transaction and Marketing and Communications Data
                  to process and deliver your purchases are (a) the performance
                  of a contract with you and (b) it is necessary for our
                  legitimate interests.
                </li>
                <li>
                  The lawful bases for collecting your Identity, Contact,
                  Profile, and Marketing and Communications Data to manage a
                  relationship with you are (a) the performance of a contract
                  with you and (b) it is necessary for our legitimate interests
                  (to keep our records updated and to study how customers use
                  our products/services).
                </li>
                <li>
                  The lawful bases for collecting your Identity, Contact,
                  Profile, Usage, and Marketing and Communications Data to
                  enable you to partake in a contest, competition or complete a
                  survey are (a) the performance of a contract with you and (b)
                  it is necessary for our legitimate interests (to study how
                  customers use our products and services, to develop them and
                  grow our business).
                </li>
                <li>
                  The lawful basis to collect your Identity, Contact, and
                  Technical Data to administer and protect our business and the
                  Site is that it is necessary for our legitimate interests (for
                  running our business, provision of administration and IT
                  services, network security, to prevent fraud and in the
                  context of a business reorganization or group restructuring
                  exercise).
                </li>
                <li>
                  The lawful basis to collect your Identity, Contact, Profile,
                  Usage, Marketing and Communications, and Technical Data to
                  deliver relevant Site content and advertisements to you and
                  measure or understand the effectiveness of the advertising we
                  serve to you is that it is necessary for our legitimate
                  interests (to study how customers use our products/services,
                  to develop them, to grow our business and to inform our
                  marketing strategy).
                </li>
                <li>
                  The lawful basis to collect Technical and Usage Data to use
                  data analytics to improve our Site, marketing, customer
                  relationships and experiences is that it is necessary for our
                  legitimate interests (to define types of customers for our
                  products and services, to keep our Site updated and relevant,
                  to develop our business and to inform our marketing strategy).
                </li>
                <li>
                  The lawful basis to collect Identity, Contact, Profile, Usage,
                  and Technical Data to make suggestions and recommendations to
                  you about goods or services that may be of interest to you is
                  that it is necessary for legitimate interests (to develop our
                  products/services and grow our business).
                </li>
              </ol>
              <p>
                We do not collect any Special Categories of personal data about
                you (this includes details about your race or ethnicity,
                religious or philosophical beliefs, sex life, sexual
                orientation, political opinions, trade union membership,
                information about your health and genetic and biometric data).
                Nor do we collect any information about criminal convictions and
                offences.
              </p>
              <p>
                Note that we may process your personal data for more than one
                lawful ground depending on the specific purpose for which we are
                using your data. Please contact us if you need details about the
                specific legal ground we are relying on to process your personal
                data where more than one ground has been set out forth in this
                Privacy Policy.
              </p>
              <p>
                We may have to share your personal data with the parties set out
                below for the purposes described in this Policy.
              </p>
              <p>
                <i>External Third Parties</i>
              </p>
              <ol className="disk">
                <li>
                  Site providers acting as processors based in the United States
                  who provide IT and system administration services.
                </li>
                <li>
                  Professional advisers acting as processors or joint
                  controllers including lawyers, bankers, auditors and insurers
                  based in the United States and Australia who provide
                  consultancy, banking, legal, insurance and accounting
                  services.
                </li>
                <li>
                  Specific third parties such as PayPal, Facebook, and Twitter.
                </li>
                <li>
                  Third parties to whom we may choose to sell, transfer, or
                  merge parts of our business or our assets. Alternatively, we
                  may seek to acquire other businesses or merge with them. If a
                  change happens to our business, then the new owners may use
                  your personal data in the same way as set out in this Privacy
                  Policy.
                </li>
              </ol>
              <p>
                We require all third parties to respect the security of your
                personal data and to treat it in accordance with the law. We do
                not allow our third-party service providers to use your personal
                data for their own purposes and only permit them to process your
                personal data for specified purposes and in accordance with our
                instructions.
              </p>
              <p>
                <i>International Processing</i>
              </p>
              <p>
                We are based in the United States, which is where all of your
                data will be processed.
              </p>
              <p>
                <i>Data Security</i>
              </p>
              <p>
                We have put in place appropriate security measures to prevent
                your personal data from being accidentally lost, used or
                accessed in an unauthorized way, altered or disclosed. In
                addition, we limit access to your personal data to those
                employees, agents, contractors and other third parties who have
                a business need to know. They will only process your personal
                data on our instructions and they are subject to a duty of
                confidentiality. We have put in place procedures to deal with
                any suspected personal data breach and will notify you and any
                applicable regulator of a breach where we are legally required
                to do so.
              </p>
              <p>
                <i>Data Retention</i>
              </p>
              <p>
                We will only retain your personal data for as long as necessary
                to fulfil the purposes we collected it for, including for the
                purposes of satisfying any legal, accounting, or reporting
                requirements. To determine the appropriate retention period for
                personal data, we consider the amount, nature, and sensitivity
                of the personal data, the potential risk of harm from
                unauthorized use or disclosure of your personal data, the
                purposes for which we process your personal data and whether we
                can achieve those purposes through other means, and the
                applicable legal requirements. In some circumstances you can ask
                us to delete your data. In some circumstances we may anonymize
                your personal data (so that it can no longer be associated with
                you) for research or statistical purposes in which case we may
                use this information indefinitely without further notice to you.
              </p>
              <p>
                <i>YOUR LEGAL RIGHTS UNDER THE GDPR</i>
              </p>
              <p>
                Under certain circumstances, EEA residents have rights under
                data protection laws in relation to their personal data. If you
                are an EEA resident, you have the right to:
              </p>
              <ol className="disk">
                <li>
                  <b>Request access</b> to your personal data. This enables you
                  to receive a copy of the personal data we hold about you and
                  to check that we are lawfully processing it.
                </li>
                <li>
                  <b>Request correction</b> of the personal data that we hold
                  about you. This enables you to have any incomplete or
                  inaccurate data we hold about you corrected, though we may
                  need to verify the accuracy of the new data you provide to us.
                </li>
                <li>
                  <b>Request erasure</b> of your personal data. This enables you
                  to ask us to delete or remove personal data where there is no
                  good reason for us continuing to process it. You also have the
                  right to ask us to delete or remove your personal data where
                  you have successfully exercised your right to object to
                  processing (see below), where we may have processed your
                  information unlawfully or where we are required to erase your
                  personal data to comply with local law. Note, however, that we
                  may not always be able to comply with your request of erasure
                  for specific legal reasons which will be notified to you, if
                  applicable, at the time of your request.
                </li>
                <li>
                  <b>Object to processing</b> of your personal data where we are
                  relying on a legitimate interest (or those of a third party)
                  and there is something about your particular situation which
                  makes you want to object to processing on this ground as you
                  feel it impacts on your fundamental rights and freedoms. You
                  also have the right to object where we are processing your
                  personal data for direct marketing purposes. In some cases, we
                  may demonstrate that we have compelling legitimate grounds to
                  process your information which override your rights and
                  freedoms.
                </li>
                <li>
                  <b>Request restriction of processing</b> of your personal
                  data. This enables you to ask us to suspend the processing of
                  your personal data in the following scenarios: (a) if you want
                  us to establish the data's accuracy; (b) where our use of the
                  data is unlawful but you do not want us to erase it; (c) where
                  you need us to hold the data even if we no longer require it
                  as you need it to establish, exercise or defend legal claims;
                  or (d) you have objected to our use of your data but we need
                  to verify whether we have overriding legitimate grounds to use
                  it.
                </li>
                <li>
                  <b>Request the transfer</b> of your personal data to you or to
                  a third party. We will provide to you, or a third party you
                  have chosen, your personal data in a structured, commonly
                  used, machine-readable format. Note that this right only
                  applies to automated information which you initially provided
                  consent for us to use or where we used the information to
                  perform a contract with you.
                </li>
                <li>
                  <b>Withdraw consent at any time</b> where we are relying on
                  consent to process your personal data. However, this will not
                  affect the lawfulness of any processing carried out before you
                  withdraw your consent. If you withdraw your consent, we may
                  not be able to provide certain products or services to you. We
                  will advise you if this is the case at the time you withdraw
                  your consent.
                </li>
              </ol>
              <p>
                If you wish to exercise any of the rights set out above, please
                contact us. You will not have to pay a fee to access your
                personal data (or to exercise any of the other rights). However,
                we may charge a reasonable fee if your request is clearly
                unfounded, repetitive or excessive. Alternatively, we may refuse
                to comply with your request in these circumstances. We may need
                to request specific information from you to help us confirm your
                identity and ensure your right to access your personal data (or
                to exercise any of your other rights). This is a security
                measure to ensure that personal data is not disclosed to any
                person who has no right to receive it. We may also contact you
                to ask you for further information in relation to your request
                to speed up our response. We try to respond to all legitimate
                requests within one month. Occasionally it may take us longer
                than a month if your request is particularly complex or you have
                made a number of requests. In this case, we will notify you and
                keep you updated.
              </p>
              <p>
                <b>Our Contact Information</b>
              </p>
              <p>
                Please contact us with any questions or comments about this
                Policy, your personal information, our use and disclosure
                practices, or your consent choices by email at
                support@homemuse.io.
              </p>
              <p>
                HOMEMUSE LLC <br /> 530 Lytton Avenue, 2nd Floor <br /> Palo
                Alto, CA 94301
              </p>
            </li>
          </ul>
        </div>
      </div>
    </StyledPolicies>
  );
}

export default SitePolicies;
