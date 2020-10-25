import React from "react";
import styled from "styled-components";

const StyledTerms = styled.section`
  background: #fff;
  list-style-type: none;

  .terms__wrapper {
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
    ol.disk__type,
    ol.alpha__type {
      font-size: 14px;
    }
    ol.disk__type {
      li {
        list-style-type: disc;
      }
    }
    ol.alpha__type {
      li {
        list-style-type: lower-alpha;
      }
    }
  }
`;

function TermsAndConditions(props) {
  return (
    <StyledTerms>
      <div className="container">
        <div className="terms__wrapper">
          <h2>
            Terms of Service Agreement <br />{" "}
            <small>Last updated January 1st, 2020</small>
          </h2>
          <li>
            <p>
              <b>1. User’s Acknowledgment and Acceptance of Terms</b>
            </p>
            <p>
              HOMEMUSE LLC (“Us,” “We,” “HOMEMUSE,” or the “Company”) provides
              the www.HOMEMUSE.io website and various related services
              (collectively, the “Platform”) to you, the user, subject to your
              compliance with all the terms, conditions, and notices contained
              or referenced herein (the “Terms of Service” or “Agreement”), as
              well as any other written agreement between us and you. All such
              guidelines or rules are hereby incorporated by reference into
              these Terms of Service. <br /> You are permitted to use the
              Platform only if you: (1) Represent that you are able to form a
              binding contract in your jurisdiction; (2) Comply with our Terms
              of Service; (3) Will not copy or distribute any part of any part
              of the Platform in any medium without Company’s prior written
              authorization except as permitted through the Platform’s
              functionality and under these Terms of Service; (4) Provide
              accurate and complete information when creating an account; (5)
              Acknowledge you are solely responsible for the activity that
              occurs while signed in to or while using the Platform; (6) Don’t
              collect any personally identifiable information, including full
              names, physical addresses, or email addresses, for commercial
              purposes from the Platform without consent; and (7) Acknowledge
              your sole responsibility for your content submissions, including
              discussion posts, profile information and links, pictures, and
              other such content. The Platform is available only to, and may
              only be used by individuals who can form legally binding contracts
              under applicable law. Without limiting the foregoing, the Platform
              is not available to children (persons under the age of 18) or
              users who have had their user account temporarily or permanently
              deactivated. By becoming a user, you represent and warrant that
              you are at least 18 years old and that you have the right,
              authority, and capacity to enter into and abide by the terms and
              conditions of this Agreement. <br /> YOUR USE OF THE PLATFORM
              CONSTITUTES YOUR AGREEMENT TO BE BOUND BY THESE TERMS OF SERVICE.
              IF YOU DO NOT WISH TO BE BOUND BY THE THESE TERMS OF SERVICE,
              PLEASE EXIT THE PLATFORM NOW. YOUR SOLE REMEDY FOR DISSATISFACTION
              WITH THE PLATFORM, OR ANY PRODUCTS, SERVICES, CONTENT, OR OTHER
              INFORMATION AVAILABLE ON OR THROUGH THE PLATFORM, IS TO STOP USING
              THE PLATFORM AND/OR THOSE PARTICULAR PRODUCTS OR SERVICES. YOUR
              AGREEMENT WITH US REGARDING COMPLIANCE WITH THESE TERMS OF SERVICE
              BECOMES EFFECTIVE IMMEDIATELY UPON COMMENCEMENT OF YOUR USE OF THE
              PLATFORM. <br /> These Terms of Service provide that all disputes
              between you and HOMEMUSE will be resolved by BINDING ARBITRATION.
              YOU AGREE TO GIVE UP YOUR RIGHT TO GO TO COURT to assert or defend
              your rights under or relating to this contract, except for matters
              that may be taken to small claims court. Your rights will be
              determined by a NEUTRAL ARBITRATOR and NOT a judge or jury, and
              your claims cannot be brought as a class, collective, or
              representative action. Please review Section 15 (“Dispute
              Resolution and Arbitration”) for the details regarding your
              agreement to arbitrate any disputes with HOMEMUSE. <br /> In these
              Terms of Service, we use the terms “you,” “your,” and “User” to
              mean any person using our Platform, and any organization or person
              using the Platform on an organization’s behalf. As used in these
              Terms of Service, “Student(s)” refers to any User who is seeking
              music lessons and related services, “Teacher(s)” refers to any
              User who provides music lessons and related services.
            </p>
          </li>
          <li>
            <p>
              <b>2. Overview of our Services</b>
            </p>
            <p>
              HOMEMUSE is a technology platform that helps connect Students with
              Teacher. HOMEMUSE does not provide any music lessons or related
              services. We make no representations or warranties about the
              quality of music lessons or other services provided by Teachers,
              or about your interactions and dealings with Users.
            </p>
          </li>
          <li>
            <p>
              <b>3. Account Information and Security</b>
            </p>
            <p>
              When you register, you provide us with some basic information,
              such as a phone number or email address. For more information
              regarding the information we collect from you and how we use it,
              please consult our Privacy Policy. Keep your email address and
              other account information current and accurate. You alone are
              responsible for anything that happens from your failure to
              maintain security and confidentiality, such as by sharing your
              account credentials with others. If someone is using your account,
              notify us immediately.
            </p>
          </li>
          <li>
            <p>
              <b>4. Vetting of Users</b>
            </p>
            <p>
              We have not vetted Teachers and Students, although we will try to
              ensure that Teachers meet certain minimum requirements to be on
              the Platform. Students are wholly responsible for all aspects of
              contacting, screening, selecting and employing a Teacher;
              likewise, Teachers are wholly responsible for all aspects of
              contacting, screening, and selecting Students. We are not
              responsible for the conduct of any member of the Platform, either
              online or offline. Because HOMEMUSE does not vet Users, HOMEMUSE
              cannot guarantee the accuracy or the identity of any Teacher,
              Student, or User. Accordingly, HOMEMUSE cannot and does not assume
              any responsibility or liability for improper vetting or failing to
              vet a User of the Platform, nor for the conduct of anyone who uses
              the Platform. <br /> Though we provide general guidance on our
              Platform to Users about selecting a Teacher or Student, HOMEMUSE
              does not employ, recommend Students or Teachers, and we will not
              be responsible or liable for the performance or conduct of any
              User, whether online or offline. Using the Platform often involves
              meeting real people and doing real things in the real world, which
              can sometimes lead to unexpected situations. You should use common
              sense and good judgment when interacting with others. Users are
              wholly responsible for complying with all applicable laws in
              relation to their employment relationship. <br /> HOMEMUSE, NOR
              ITS AFFILIATES OR LICENSORS IS RESPONSIBLE FOR THE CONDUCT,
              WHETHER ONLINE OR OFFLINE, OF ANY USER OF HOMEMUSE AND YOU HEREBY
              RELEASE HOMEMUSE AND ITS AFFILIATES OR LICENSORS FROM ANY
              LIABILITY RELATED THERETO. HOMEMUSE AND ITS AFFILIATES AND
              LICENSORS WILL NOT BE LIABLE FOR ANY CLAIM, INJURY, OR DAMAGE
              ARISING IN CONNECTION WITH YOUR USE OF HOMEMUSE.
            </p>
          </li>
          <li>
            <p>
              <b>5. Fees & Payments</b>
            </p>
            <p>
              For each payment between each Student and Teacher, HOMEMUSE takes
              a percent of the payment as a booking fee (“Booking Fee”). The
              Booking Fee is paid by Teachers via our third-party payment
              processor through the Platform, and the amount is set forth on the
              Platform. HOMEMUSE reserves the right to change its fee structure
              and payment methods at any time, and will inform Users via the
              Platform. <br /> By agreeing to these Terms of Service, you are
              giving HOMEMUSE permission to charge your on-file credit card or
              other approved methods of payment for fees that you authorize
              HOMEMUSE to satisfy. Depending on arrangement agreed upon between
              Teachers and Students, HOMEMUSE may charge you on a one-time or
              recurring basis. You authorize HOMEMUSE to charge you the full
              amounts owed by you to any User via the Platform, as well as
              applicable service and processing fees.
            </p>
          </li>
          <li>
            <p>
              <b>6. Teacher Requirements</b>
            </p>
            <p>
              Teachers must have the necessary skills and qualifications to give
              music lessons and must comply with all applicable local, state,
              and federal laws, and must also obtain any business permits when
              required by law to operate. Any failure to comply with this
              Section 6 will be considered a breach of these Terms of Service
              and may result in the immediate removal of Teacher from the
              Platform.
            </p>
          </li>
          <li>
            <p>
              <b>7. Relationship between Users and HOMEMUSE</b>
            </p>
            <p>
              Users, including Clients and Teachers accessing the Platform,
              recognize, acknowledge, and agree that a Teacher is not an
              employee of HOMEMUSE. No partnership or employment relationship
              between HOMEMUSE and Teachers can be construed by these Terms of
              Service. No agency relationship exists between HOMEMUSE and a
              Teacher, and as such, Teachers are not authorized to represent
              HOMEMUSE as their agent. <br /> HOMEMUSE does not oversee,
              supervise, monitor, train, or manage Teachers, nor does HOMEMUSE
              determine Teacher hours or schedules of work or the manner in
              which their work is performed. HOMEMUSE does not provide Teachers
              with any training, tools, equipment, supplies, or
              instrumentalities. HOMEMUSE does not provide Teachers with any
              instructions. If a Teacher hires or retains any persons to assist
              the Teacher in providing services to a Student or to provide
              services to the Student in lieu of the Teacher providing those
              services, the Teacher bears all responsibility for paying and
              classifying those workers and complying with all applicable laws
              with respect to such workers. Except if otherwise outlined in our
              Dispute Policy, HOMEMUSE will not replace or seek to replace
              Teachers unable to fulfill work on the Platform other than
              permitting Students to search for additional Teachers on the
              Platform. <br /> HOMEMUSE does perform background checks on Users.
              While the Platform allows Users to leave reviews, HOMEMUSE is not
              responsible for this content nor does HOMEMUSE endorse Users of
              the Platform. <br /> HOMEMUSE is not responsible for withholding
              taxes for the Student or Teacher, and it is the responsibility of
              each User to file and comply with any local, state, or federal tax
              laws in their jurisdiction.
            </p>
          </li>
          <li>
            <p>
              <b>8. Use of Subcontractors and Worker Classification</b>
            </p>
            <p>
              HOMEMUSE is not responsible for any workers that Students or
              Teachers engage or hire. It is the responsibility of Users to
              determine whether Teachers should be classified as employees or
              independent contractors, and Users bear all risk of
              misclassification. Users who determine a Teacher should be an
              employee must comply with Section 10 below. <br /> To be clear,
              HOMEMUSE does not classify Teachers as employees or independent
              contractors. Rather, Users must determine, under applicable law,
              whether the Teacher is an employee or independent contractor (or
              some other category of worker if not in the U.S. and if foreign
              law has other categories of workers). HOMEMUSE suggests that Users
              obtain their own legal advice in making such determination. Users
              are also responsible for complying with all applicable worker
              and/or employment-related laws, including, but not limited to,
              obtaining workers’ compensation insurance when required by
              applicable law. Of course, at all times, all Users must comply
              with all applicable laws.
            </p>
          </li>
          <li>
            <p>
              <b>9. Disputes Between Students and Teachers</b>
            </p>
            <p>
              HOMEMUSE does not guarantee the quality or delivery of any lessons
              or services by Teachers to Students. <br /> HOMEMUSE reserves the
              right to establish a dispute policy (“Dispute Policy”) on the
              Platform. Absent such Dispute Policy, in the case a dispute arises
              between Users of the Platform, Users acknowledge that it is their
              responsibility to come to a mutual agreement and resolution.
              HOMEMUSE does not act as intermediary. <br /> Payments are
              non-disputable via the Platform once payment has been released to
              the Teacher. In the case of a dispute after the payment has been
              released, Students must directly contact the Teacher to request
              refunds. <br /> For all disputes, the maximum refund amount
              Students can be awarded is the full amount of the invoice which is
              disputed.
            </p>
          </li>
          <li>
            <p>
              <b>10. Non-Circumvention Policy</b>
            </p>
            <p>
              As a User, you acknowledge and agree that a substantial portion of
              the compensation HOMEMUSE receives for making the Platform
              available to you is collected through the Booking Fee. HOMEMUSE
              only receives the Booking Fee when Teacher invoices the Student
              through the Platform. Therefore, you must use the Platform as your
              exclusive method to request, make, and receive payments for work
              directly or indirectly with any User of the Platform that you’ve
              been connected with through the Platform and related to
              professional healthcare services. You may opt-out of this
              obligation with respect to each Student-Teacher relationship only
              if Teacher pays HOMEMUSE for each such relationship by paying an
              “Opt-Out Fee” which is the higher of (1) 25% of the estimated
              income for the first one (1) year of work together outside of the
              Platform, as determined by HOMEMUSE in its sole discretion or (2)
              $2,500. To request an opt-out, you should send an e-mail to
              HOMEMUSE at support@HOMEMUSE.io. Users will have five (5) days to
              pay the invoice in full before HOMEMUSE automatically processes
              the charge using the User’s payment method on file with HOMEMUSE,
              unless the Users have arranged an alternate payment schedule with
              HOMEMUSE.
            </p>
          </li>
          <li>
            <p>
              <b>11. Feedback</b>
            </p>
            <p>
              We always appreciate feedback and are always on the lookout for
              ways to improve. For feedback, comments, questions, or concerns,
              you can contact us at support@HOMEMUSE.io and we will return your
              e-mail at the soonest opportunity possible.
            </p>
          </li>
          <li>
            <p>
              <b>12. Guarantee and Warranty</b>
            </p>
            <p>
              Use of the Platform is at your sole risk. All services are
              provided “as is,” with no warranties or guarantees whatsoever.
              HOMEMUSE expressly disclaims to the fullest extent permitted by
              law all express, implied, statutory, and other warranties,
              guarantees, or representations, including, without limitation, the
              warranties of merchantability, fitness for a particular purpose,
              and non-infringement of proprietary and intellectual property
              rights. Without limitation, HOMEMUSE makes no warranty or
              guarantee that the Platform will be uninterrupted, timely, secure,
              or error-free. HOMEMUSE does not warrant the quality or accuracy
              of any deliverables provided and/or services rendered by its Users
              and does not warrant that any such deliverables and services will
              be provided and/or rendered in a timely or professional manner. By
              using the Platform, Users hereby understand and acknowledge that
              any agreements and services performed by Users, including Teachers
              and Students, are between Teachers and Students only, and that
              HOMEMUSE is not a party to any agreement between the Users.
              HOMEMUSE offers a platform to connect Teachers and Students only
              and will take no responsibility for any services rendered or for
              any breach of contract. You understand and agree that any
              interaction with a User is at your own discretion and risk and
              that you will be solely responsible for any damages that may
              result. Some jurisdictions do not allow the exclusion of
              warranties, so the above exclusions may not apply to you.
            </p>
          </li>
          <li>
            <p>
              <b>13. Release</b>
            </p>
            <p>
              HOMEMUSE is not an employer of Teachers. Students may seek the
              services of a Teacher through the use of the Platform, and
              Teachers may post profiles and message Students regarding their
              services. Although HOMEMUSE may, at times, provide Students with a
              customized list of potential Teachers to consider, if the Student
              agrees on receiving services from a Teacher identified this way,
              such agreement is solely between the Student and Teacher and
              HOMEMUSE is not a party to such agreement. In the event that you
              have a dispute with a user of the Platform, including with a
              Teacher or Student, you agree to release HOMEMUSE (including our
              affiliates and each of our respective officers, directors,
              employees, agents, shareholders, and suppliers) from claims,
              demands and damages of every kind and nature, known and unknown,
              suspected and unsuspected, disclosed and undisclosed, arising out
              of or in any way connected to such disputes with other users or to
              your use of the Platform or participation in the services.
              Additionally, you expressly waive any rights you may have under
              California Civil Code Section 1542 (or analogous laws of other
              states), which says: “A general release does not extend to claims
              which the creditor does not know or suspect to exist in his favor
              at the time of executing the release, which, if known by him must
              have materially affected his settlement with the debtor.” We
              reserve the right, but have no obligation, to monitor disputes
              between you and other users.
            </p>
          </li>
          <li>
            <p>
              <b>14. Limitation of Liability</b>
            </p>
            <p>
              IN NO EVENT WILL HOMEMUSE BE LIABLE TO ANY PARTY FOR ANY DIRECT,
              INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES
              OF ANY TYPE WHATSOEVER RELATED TO OR ARISING FROM THE PLATFORM OR
              ANY USE OF THE PLATFORM, OR OF ANY SITE OR RESOURCE LINKED TO,
              REFERENCED, OR ACCESSED THROUGH THE PLATFORM, OR FOR THE USE OR
              DOWNLOADING OF, OR ACCESS TO, ANY MATERIALS, INFORMATION,
              PRODUCTS, OR SERVICES, INCLUDING, WITHOUT LIMITATION, ANY LOST
              PROFITS, BUSINESS INTERRUPTION, LOST SAVINGS OR LOSS OF PROGRAMS
              OR OTHER DATA, EVEN IF HOMEMUSE IS EXPRESSLY ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGES. THIS EXCLUSION AND WAIVER OF
              LIABILITY APPLIES TO ALL CAUSES OF ACTION, WHETHER BASED ON
              CONTRACT, WARRANTY, TORT, OR ANY OTHER LEGAL THEORIES.
            </p>
          </li>
          <li>
            <p>
              <b>15. Dispute Resolution and Arbitration</b>
            </p>
            <p>
              In the interest of resolving disputes between you and HOMEMUSE in
              the most expedient and cost-effective manner, you and HOMEMUSE
              agree that every dispute arising in connection with these Terms of
              Service will be resolved by binding arbitration. Arbitration uses
              a neutral arbitrator instead of a judge or jury, may allow for
              more limited discovery than in court, and is subject to very
              limited (if any) review by courts. Arbitrators can award the same
              damages and relief that a court can award. This agreement to
              arbitrate disputes includes all claims arising out of or relating
              to any aspect of these Terms, whether based in contract, tort,
              statute, fraud, misrepresentation, or any other legal theory, and
              regardless of whether a claim arises during or after the
              termination of these Terms. YOU UNDERSTAND AND AGREE THAT, BY
              ENTERING INTO THESE TERMS, YOU AND HOMEMUSE ARE EACH WAIVING THE
              RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS, COLLECTIVE,
              OR REPRESENTATIVE ACTION. <br /> Despite the provisions of the
              preceding paragraph, nothing in these Terms of Service will be
              deemed to waive, preclude, or otherwise limit the right of either
              party to: (a) bring an individual action in small claims court;
              (b) pursue an enforcement action through the applicable federal,
              state, or local agency if that action is available; (c) seek
              injunctive relief in a court of law; or (d) to file suit in a
              court of law to address an intellectual property infringement
              claim. <br /> <u>Arbitrator</u> <br /> Any arbitration between you
              and HOMEMUSE will be settled under the Federal Arbitration Act,
              and governed by the Commercial Dispute Resolution Procedures and
              the Supplementary Procedures for Consumer Related Disputes
              (collectively, “AAA Rules”) of the American Arbitration
              Association (“AAA”), as modified by these Terms, and will be
              administered by the AAA. The AAA Rules and filing forms are
              available online at www.adr.org, by calling the AAA at
              1-800-778-7879, or by contacting HOMEMUSE at support@HOMEMUSE.io.{" "}
              <br /> <u>Notice; Process</u> <br /> A party who intends to seek
              arbitration must first send a written notice of the dispute to the
              other party by certified U.S. Mail or by Federal Express
              (signature required) or, only if such other party has not provided
              a current physical address, then by electronic mail (“Notice”).
              HOMEMUSE’s address for Notice is: HOMEMUSE LLC, 530 Lytton Avenue,
              2nd Floor, Palo Alto, CA 94301. The Notice must: (a) describe the
              nature and basis of the claim or dispute; and (b) set forth the
              specific relief sought (“Demand”). The parties will make good
              faith efforts to resolve the claim directly, but if the parties do
              not reach an agreement to do so within 30 days after the Notice is
              received, you or HOMEMUSE may commence an arbitration proceeding.
              During the arbitration, the amount of any settlement offer made by
              you or HOMEMUSE must not be disclosed to the arbitrator until
              after the arbitrator makes a final decision and award, if any. If
              the dispute is finally resolved through arbitration in your favor,
              HOMEMUSE will pay you the highest of the following: (i) the amount
              awarded by the arbitrator, if any; (ii) the last written
              settlement amount offered by HOMEMUSE in settlement of the dispute
              prior to the arbitrator’s award; or (iii) $1,000. <br />{" "}
              <u>Fees and Procedure</u> <br /> The parties to the arbitration
              shall each pay an equal share of the costs and expenses of such
              arbitration, and each party shall separately pay for its
              respective counsel fees and expenses; provided, however, that the
              arbitrator may award attorneys’ fees and costs to the prevailing
              party, except as prohibited by law. If you commence arbitration in
              accordance with these Terms of Services, HOMEMUSE will reimburse
              you for your payment of the filing fee, unless your claim is for
              more than $10,000, in which case the payment of any fees will be
              decided by the AAA Rules. Any arbitration hearing will take place
              at a location to be agreed upon in Palot Alto, California, but if
              the claim is for $10,000 or less, you may choose whether the
              arbitration will be conducted: (a) solely on the basis of
              documents submitted to the arbitrator; (b) through a
              non-appearance based telephone hearing; or (c) by an in-person
              hearing as established by the AAA Rules in the county (or parish)
              of your billing address. If the arbitrator finds that either the
              substance of your claim or the relief sought in the Demand is
              frivolous or brought for an improper purpose (as measured by the
              standards set forth in Federal Rule of Civil Procedure 11(b)),
              then the payment of all fees will be governed by the AAA Rules. In
              that case, you agree to reimburse HOMEMUSE for all monies
              previously disbursed by it that are otherwise your obligation to
              pay under the AAA Rules. Regardless of the manner in which the
              arbitration is conducted, the arbitrator must issue a reasoned
              written decision sufficient to explain the essential findings and
              conclusions on which the decision and award, if any, are based.
              The arbitrator may make rulings and resolve disputes as to the
              payment and reimbursement of fees or expenses at any time during
              the proceeding and upon request from either party made within 14
              days of the arbitrator’s ruling on the merits. <br /> The
              arbitrator may grant injunctions and other relief. The arbitrator
              shall administer and conduct any arbitration in accordance with
              the law of the jurisdiction in which the dispute arose, including
              civil procedure rules, and the arbitrator shall apply the
              substantive and procedural law of the jurisdiction in which the
              dispute arose. To the extent that the AAA Rules conflict with
              local law, local law shall take preference. The decision of the
              arbitrator shall be final, conclusive, and binding on the parties
              to the arbitration. The parties agree that the prevailing party in
              any arbitration shall be entitled to injunctive relief in any
              court of competent jurisdiction to enforce the arbitration award.{" "}
              <br /> <u>No Class Actions</u> <br /> YOU AND HOMEMUSE AGREE THAT
              EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS
              INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR MEMBER OF ANY CLASS,
              COLLECTIVE, OR REPRESENTATIVE PROCEEDING except that users may
              bring a proceeding as a private attorney general, if and as
              allowed by law. Further, unless both you and HOMEMUSE agree
              otherwise, the arbitrator may not consolidate more than one
              person’s claims, and may not otherwise preside over any form of a
              representative or class proceeding. Nothing in this Agreement
              infringes upon any rights a User may have under the Sarbanes-Oxley
              Act, including any rights prohibiting compulsory arbitration.{" "}
              <br /> <u>Modifications to this Arbitration Provision</u> <br />{" "}
              If HOMEMUSE makes any future change to this arbitration provision,
              other than a change to HOMEMUSE’s address for Notice, you may
              reject the change by sending us written notice within 30 days of
              the change to HOMEMUSE’s address for Notice, in which case your
              account with HOMEMUSE will be immediately terminated and this
              arbitration provision, as in effect immediately prior to the
              changes you rejected will survive. <br /> <u>Enforceability</u>{" "}
              <br /> If the “No Class Actions” section is found to be
              unenforceable or if the entirety of this Section 11 is found to be
              unenforceable, then the entirety of this Section 11 will be null
              and void and, in that case, the parties agree that the exclusive
              jurisdiction and venue described in Section 12 will govern any
              action arising out of or related to these Terms of Service. <br />{" "}
              <u>Right to Opt Out of Arbitration</u> <br /> You may submit a
              statement notifying HOMEMUSE that you wish to opt out and not be
              subject to arbitration under this section. Should you desire to
              opt out, you must notify HOMEMUSE of your intention to opt out by
              submitting a written notice, which may be via email to
              support@HOMEMUSE.io, stating that you are opting out of this
              section. In order to be effective, your opt out notice must be
              provided within thirty (30) days of your agreeing to these Terms.
              Should you timely opt out of this section, you may pursue
              available legal remedies and will not be required to arbitrate
              claims.
            </p>
          </li>
          <li>
            <p>
              <b>16. Choice of Law</b>
            </p>
            <p>
              These Terms are governed by and construed in accordance with the
              laws of the State of California, United States of America, without
              giving effect to any conflict of law principles, except as may be
              otherwise provided in supplemental terms applicable to your
              region. Any dispute or claim arising out of or in connection with
              this Agreement shall be adjudicated in Palo Alto, California.
            </p>
          </li>
          <li>
            <p>
              <b>17. Termination of Service</b>
            </p>
            <p>
              HOMEMUSE may terminate your privilege to use or access the
              Platform immediately and without notice for any reason
              whatsoever. Upon such termination, you must immediately cease
              accessing or using the Platform and agree not access or make use
              of, or attempt to use, the Platform. Furthermore, you acknowledge
              that HOMEMUSE reserves the right to take action -- technical,
              legal or otherwise -- to block, nullify or deny your ability to
              access the Platform. You understand that HOMEMUSE may exercise
              this right in its sole discretion, and this right shall be in
              addition to and not in substitution for any other rights and
              remedies available to HOMEMUSE. <br /> All provisions of these
              Terms of Service which by their nature should survive termination
              shall survive the termination of your access to the Platform,
              including, without limitation, provision regarding ownership,
              warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </li>
          <li>
            <p>
              <b>18. Content</b>
            </p>
            <p>
              The Platform may contain personal web pages or profiles, forums,
              review and ratings sections, message boards and other interactive
              features (collectively, “Interactive Services”) that allow users
              to post, submit, publish, display or transmit to other users or
              other persons (hereinafter, “post”) comments, content or other
              materials (collectively, “User Contributions”) on or through the
              Platform. These Interactive Services and User Contributions are
              separate from communications sent via our private messaging system
              (“User Messages”). <br /> If you voluntarily disclose personal
              information (e.g., user name, email address, personal information)
              on the Platform through a User Contribution, such as in a review,
              that information can be viewed in search engines, collected and
              used by others and may result in unsolicited contact from other
              parties. We strongly advise that you not post any personal or
              other sensitive information on the Platform. <br /> Any User
              Contribution you post to the Platform will be considered
              non-confidential and non-proprietary. By providing any User
              Contribution on the Platform, you grant us and our affiliates and
              service Teachers, and each of their and our respective licensees,
              successors and assigns the perpetual right to use, reproduce,
              modify, perform, display, distribute and otherwise disclose to
              third parties any such material for any purpose.
            </p>
            <p>You represent and warrant that:</p>
            <ol className="disk__type">
              <li>
                You own or control all rights in and to the User Contributions
                and have the right to grant the license granted above to us and
                our affiliates and service Teachers, and each of their and our
                respective licensees, successors and assigns.
              </li>
              <li>
                All of your User Contributions and User Messages do and will
                comply with these Terms of Service.
              </li>
            </ol>
            <p>
              You understand and acknowledge that you are responsible for any
              User Contributions or User Messages you submit or contribute, and
              you, not the Company, have full responsibility for such content,
              including its legality, reliability, accuracy and appropriateness.
              We are not responsible, or liable to any third party, for the
              content or accuracy of any User Contributions or User Messages
              posted by you or any other user of the Platform.
            </p>
            <p>Additionally, we have the right to:</p>
            <ol className="disk__type">
              <li>
                Remove or refuse to post any User Contributions or User Message
                for any or no reason in our sole discretion.
              </li>
              <li>
                Take any action with respect to any User Contribution or User
                Message that we deem necessary or appropriate in our sole
                discretion, including if we believe that such User Contribution
                or User Message violates the Terms of Service, including the
                content standards below, infringes any intellectual property
                right or other right of any person or entity, threatens the
                personal safety of users of the Platform or the public or could
                create liability for the Company.
              </li>
              <li>
                Disclose your identity or other information about you to any
                third party who claims that material posted by you violates
                their rights, including their intellectual property rights or
                their right to privacy.
              </li>
              <li>
                Take appropriate legal action, including without limitation,
                referral to law enforcement, for any illegal or unauthorized use
                of the Platform.
              </li>
              <li>
                Terminate or suspend your access to all or part of the Platform
                for any or no reason, including without limitation, any
                violation of these Terms of Service.
              </li>
            </ol>
            <p>
              Without limiting the foregoing, we have the right to fully
              cooperate with any law enforcement authorities or court order
              requesting or directing us to disclose the identity or other
              information related to anyone posting any materials on or through
              the Platform. YOU WAIVE AND HOLD HARMLESS THE COMPANY AND ITS
              AFFILIATES, AGENTS, LICENSEES AND SERVICE TEACHERS FROM ANY CLAIMS
              RESULTING FROM ANY ACTION TAKEN BY ANY OF THE FOREGOING PARTIES
              DURING OR AS A RESULT OF ITS INVESTIGATIONS AND FROM ANY ACTIONS
              TAKEN AS A CONSEQUENCE OF INVESTIGATIONS BY EITHER THE
              COMPANY/SUCH PARTIES OR LAW ENFORCEMENT AUTHORITIES. <br /> We
              cannot and do not undertake to review all material before it is
              posted on the Platform or sent as a User Message, and cannot
              ensure prompt removal of objectionable material after it has been
              posted. Accordingly, we assume no liability for any action or
              inaction regarding transmissions, communications or content
              provided by any user or third party. We have no liability or
              responsibility to anyone for performance or nonperformance of the
              activities described in this section.
            </p>
          </li>
          <li>
            <p>
              <b>19. Intellectual Property</b>
            </p>
            <p>
              The entire content and materials contained on the Platform,
              including, but not limited to, audio, video, images, text, user
              interface, scores, logos, the selection and arrangement of the
              Platform and other intellectual property (the “Content”) are owned
              by or licensed to HOMEMUSE to the fullest extent under the
              copyright laws of the United States and other countries. Images of
              people or places displayed on the Platform are either the property
              of, or used with permission by, HOMEMUSE. You may not reproduce,
              republish, transmit, upload, distribute, copy or publicly display
              any of the Content without our prior written consent. We neither
              warrant nor represent that your use of materials displayed on the
              Platform will not infringe rights of third parties not owned by or
              affiliated with the Company. We may redesign the Platform in our
              sole discretion at any time.
            </p>
          </li>
          <li>
            <p>
              <b>20. Restrictions on Use</b>
            </p>
            <p>
              You may not use the Platform or contents set forth therein for any
              illegal purpose or in any manner inconsistent with the Terms of
              Service. You agree to use the service solely for your own use and
              benefit, and not for resale or other transfer or disposition to,
              or use by or for the benefit of, any other person or entity. You
              agree not to use, transfer, distribute, or dispose of any
              information contained in the service in any manner that could
              compete with the business of Company. You may not copy, reproduce,
              recompile, disassemble, decompile, reverse engineer, distribute,
              modify, publish, display, perform, upload to, create derivative
              works from, frame transmit, or in any way exploit any part of the
              service, you may not recirculate, redistribute or publish the
              analysis and presentation included in the service without
              Company’s prior written consent. <br /> Modification of Company’s
              content is a violation of the copyrights and other proprietary
              rights of Company or its subsidiaries. Additionally, you may not
              monetize or offer any part of the service for sale or distribute
              it over any other medium including but not limited to a computer
              network or hyperlink framing on the internet without the prior
              written consent of Company. The Platform and the information
              contained therein may not be used to construct a database of any
              kind. The Platform and content contained therein may not be stored
              (in its entirety or in any part) in databases for access by you or
              any third party or to distribute. <br /> In the absence of a
              contrary agreement, you may not use any of the trademarks, trade
              names, service marks, copyrights, or logos of Company or its
              subsidiaries suppliers or affiliates in any manner which creates
              the impression that such items belong to or are associated with
              you or, except as otherwise provided herein, are used with
              Company’s consent, and you acknowledge that you have no ownership
              rights in and to any of such items. You will not use the service
              or the information contained therein in unsolicited mailings or
              spam material. You will not use any trademarks, trade names,
              service marks, copyrights, or logos of Company or its subsidiaries
              in unsolicited mailings or spam material. You will not spam or
              send unsolicited mailings to any person or entity using the
              service.
            </p>
          </li>
          <li>
            <p>
              <b>21. No Agency</b>
            </p>
            <p>
              No agency, partnership, joint venture, employee-employer or
              franchiser-franchisee relationship between you and HOMEMUSE is
              intended or created by this Agreement. A Teacher, Student, or any
              other User is not HOMEMUSE’s representative or agent, and may not
              enter into an agreement on HOMEMUSE’s behalf.
            </p>
          </li>
          <li>
            <p>
              <b>22. Digital Millennium Copyright Act</b>
            </p>
            <p>
              We comply with the provisions of the Digital Millennium Copyright
              Act applicable to internet service Teachers (17 U.S.C. §512, as
              amended). If you have an intellectual property rights-related
              complaint about material posted on the Platform, you may contact
              our Designated Agent at the following address:
            </p>
            <p>
              HOMEMUSE LLC <br /> 530 Lytton Avenue, 2nd Floor <br /> Palo Alto,
              CA 94301
            </p>
            <p>
              Any notice alleging that materials hosted by or distributed
              through the Platform infringe intellectual property rights must
              include the following information by or distributed through the
              Platform infringe intellectual property rights must include the
              following information:
            </p>
            <ol className="alpha__type">
              <li>
                An electronic or physical signature of the person authorized to
                act on behalf of the owner of the copyright or other right being
                infringed;
              </li>
              <li>
                A description of the copyright-protected work or other
                intellectual property right that you claim has been infringed;
              </li>
              <li>
                A description of the material that you claim is infringing and
                where it is located on the Service;
              </li>
              <li>Your address, telephone number, and email address;</li>
              <li>
                A statement by you that you have a good faith belief that the
                use of those materials on the Service is not authorized by the
                copyright owner, its agent, or the law; and
              </li>
              <li>
                A statement by you that the above information in your notice is
                accurate and that, under penalty of perjury, you are the
                copyright or intellectual property owner or authorized to act on
                the copyright or intellectual property owner's behalf.
              </li>
            </ol>
            <p>
              HOMEMUSE will promptly terminate without notice the accounts of
              users that are determined by HOMEMUSE to be “Repeat Infringers.” A
              Repeat Infringer is a user who has been notified of infringing
              activity or has had user content removed from the Platform at
              least twice.
            </p>
          </li>
          <li>
            <p>
              <b>23. Links to Other Sites and Materials</b>
            </p>
            <p>
              As part of using the Platform, HOMEMUSE may provide you with links
              to third party website(s) (“Third Party Sites”) as well as content
              or items belonging to or originating from third parties (the
              “Third Party Applications, Software or Content”). HOMEMUSE has no
              control over Third Party Sites and Third Party Applications,
              Software, or Content or the promotions, materials, information,
              goods or services available on these Third Party Sites or Third
              Party Applications, Software, or Content. Such Third Party Sites
              and Third Party Applications, Software, or Content are not
              investigated, monitored or checked for accuracy, appropriateness,
              or completeness by HOMEMUSE, and HOMEMUSE is not responsible for
              any Third Party Sites accessed through the Platform or any Third
              Party Applications, Software, or Content posted on, available
              through or installed from the Platform, including the content,
              accuracy, offensiveness, opinions, reliability, privacy practices
              or other policies of or contained in the Third Party Sites or the
              Third Party Applications, Software or Content. Inclusion of,
              linking to, or permitting the use or installation of any Third
              Party Site or any Third Party Applications, Software, or Content
              does not imply approval or endorsement thereof by HOMEMUSE. If you
              decide to leave the Platform and access the Third Party Sites or
              to use or install any Third Party Applications, Software or,
              Content, you do so at your own risk and you should be aware that
              our terms and policies no longer govern. You should review the
              applicable terms and policies, including privacy and data
              gathering practices, of any site to which you navigate from the
              Platform or relating to any applications you use or install from
              the site.
            </p>
          </li>
          <li>
            <p>
              <b>24. Privacy</b>
            </p>
            <p>
              HOMEMUSE’s current privacy policy is available on the Platform and
              at our website (the “Privacy Policy”), which is incorporated by
              this reference. In accordance with the Privacy Policy, we may
              collect information about the location of your device each time
              you use the Platform, or when you otherwise consent to the
              collection of this information. We strongly recommend that you
              review the Privacy Policy closely.
            </p>
          </li>
          <li>
            <p>
              <b>25. Electronic Communications</b>
            </p>
            <p>
              The communications between you and Company use electronic means,
              whether you use the Platform or send us emails, or whether Company
              posts notices on the service or communicates with you via email.
              For contractual purposes, you (a) consent to receive
              communications from Company in an electronic form; and (b) agree
              that all terms and conditions, agreements, notices, disclosures,
              and other communications that Company provides to you
              electronically satisfy any legal requirement that such
              communications would satisfy if it were in writing.
            </p>
          </li>
          <li>
            <p>
              <b>26. Notice</b>
            </p>
            <p>
              Communications made through the Service’s e-mail and messaging
              system, will not constitute legal notice to Company or any of its
              officers, employees, agents or representatives in any situation
              where notice to Company is required by contract or any law or
              regulation. <br /> Any such notice must be sent to:
            </p>
            <p>
              HOMEMUSE LLC <br /> 530 Lytton Avenue, 2nd Floor <br /> Palo Alto,
              CA 94301
            </p>
            <p>
              Under California Civil Code Section 1789.3, California users of
              the Platform receive the following specific consumer rights
              notice: The Complaint Assistance Unit of the Division of Consumer
              Services of the California Department of Consumer Affairs may be
              contacted in writing at 1020 N Street, #501, Sacramento,
              California 95814, or by telephone at 1-916-445-1254.
            </p>
          </li>
          <li>
            <p>
              <b>27. Changes and Amendments to Terms</b>
            </p>
            <p>
              These Terms of Service are effective as of the “Last Modified”
              date identified at the top of this page. We expressly reserve the
              right to change these Terms of Service from time to time without
              notice to you. You acknowledge and agree that it is your
              responsibility to review the Platform and these Terms of Service
              from time to time and to familiarize yourself with any
              modifications. Your continued use of the Platform after such
              modifications will constitute acknowledgement of the modified
              Terms of Service and agreement to abide and be bound by the
              modified Terms of Service. However, for any material modifications
              to the Terms of Service or in the event that such modifications
              materially alter your rights or obligations hereunder, such
              amended Terms of Service will automatically be effective upon the
              earlier of (i) your continued use of the Platform with actual
              knowledge of such modifications, or (ii) 30 days from publication
              of such modified Terms of Service on the Platform. Notwithstanding
              the foregoing, the resolution of any dispute that arises between
              you and us will be governed by the Terms of Service in effect at
              the time such dispute arose.
            </p>
          </li>
          <li>
            <p>
              <b>28. General Terms</b>
            </p>
            <p>
              If any part of this Agreement is held invalid or unenforceable,
              that portion of the Agreement will be construed consistent with
              applicable law. The remaining portions will remain in full force
              and effect. Any failure on the part of Company to enforce any
              provision of this Agreement will not be considered a waiver of our
              right to enforce such provision. Our rights under this Agreement
              will survive any termination of this Agreement. <br /> Company may
              assign or delegate these Terms of Service and/or Company’s Privacy
              Policy, in whole or in part, to any person or entity at any time
              with or without your consent, including, but not limited, to a
              subsidiary or an acquirer of assets. You may not assign or
              delegate any rights or obligations under the Terms of Service or
              Privacy Policy without Company’s prior written consent, and any
              unauthorized assignment and delegation by you is void. <br /> YOU
              ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF USE, UNDERSTAND THE
              TERMS OF USE, AND WILL BE BOUND BY THESE TERMS AND CONDITIONS. YOU
              FURTHER ACKNOWLEDGE THAT THESE TERMS OF USE TOGETHER WITH THE
              PRIVACY POLICY REPRESENT THE COMPLETE AND EXCLUSIVE STATEMENT OF
              THE AGREEMENT BETWEEN US AND THAT IT SUPERSEDES ANY PROPOSAL OR
              PRIOR AGREEMENT ORAL OR WRITTEN, AND ANY OTHER COMMUNICATIONS
              BETWEEN US RELATING TO THE SUBJECT MATTER OF THIS AGREEMENT.
            </p>
          </li>
        </div>
      </div>
    </StyledTerms>
  );
}

export default TermsAndConditions;
