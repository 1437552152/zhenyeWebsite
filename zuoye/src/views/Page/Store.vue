<template>
  <div>
    <Header />
    <Return style="top: 49px;z-index: 999;position: absolute;left: -14px;" />
    <van-search
      v-model="value"
      background="#0084ff"
      show-action
      placeholder="输入公司名称、老板姓名、品牌名称等"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <div class="about-box">
      <!--  关于我们 -->
      <div class="about-body" name="1" id="1">
        <div class="about-title">关于天眼查</div>
        <p
          style="margin-top:20px;"
        >“天眼查”是北京金堤科技有限公司（以下简称“金堤科技”或“天眼查”）自主开发的产品，主要有“天眼查”APP、“天眼查”网页版、“天眼查”专业版等相关产品。</p>
        <p
          style="margin-top:25px;"
        >金堤科技产品——天眼查，秉持“让每个人公平地看清这个世界”的使命，天眼查系列产品不仅可以可视化呈现复杂的商业关系，还可以深度挖掘和分析相关数据，预警风险等。</p>
        <p>天眼查个人端产品（www.tianyancha.com） 是一款“都在用的商业查询平台”，根据用户的不同需求，实现了企业背景、企业发展、司法风险、经营风险、经营状况、知识产权方面等多种数据维度的检索。 天眼查特色功能有企业关系族谱、专业信用报告等，形成了针对商业银行、政府决策、律师事务所、互联网金融、小额贷款、担保、证券等众多领域的独特的大数据解决方案。</p>
        <div class="mt30">
          电话：
          <span>400-608-0000</span>
        </div>
        <div class="mt12">
          邮箱：
          <span>bd@tianyancha.com</span>
        </div>
        <!--<div class="mt12">传真：<span>010-82158608</span></div>-->
        <div class="mt12">
          网址：
          <a
            href="https://www.tianyancha.com"
            class="c9"
            style="text-decoration:none;"
          >www.tianyancha.com</a>
        </div>
        <div style="margin-top:12px; margin-bottom:45px;">
          地址：
          <span>北京市海淀区知春路63号中国卫星通信大厦B座23层</span>
        </div>
      </div>
      <!-- 用户协议  -->
      <div class="user-body relief_body" style="position:relative;" name="2" id="2">
        <div class="about-title">用户协议</div>
        <div>
          <p style="margin-top:20px;">
            欢迎使用天眼查，在您使用天眼查提供的各项VIP会员及非会员服务（以下简称“
            <b>天眼查服务</b>”，具体形式包括但不限于您获取并使用的数据查询、信息发布、数据导出、数据接口调用等服务，亦包括未来增加或完善现有服务的任何新功能）之前，请务必仔细阅读并透彻理解本协议。您在使用天眼查服务前，应当仔细认真阅读本《用户协议》(以下简称“
            <b>本协议</b>”)中的全部条款、规则及内容（特别是其中以加粗标示出的关于天眼查服务及用户重大权益的规则，该等规则可能涉及相关方的责任免除或限制、法律适用与争议解决条款，请您重点阅读），确认对本协议全部条款、规则及内容均已知晓、理解并接受，并已同意将其作为确定双方权利义务的依据。如您使用天眼查账号访问天眼查或以其他方式使用或接受任何天眼查服务，即视为您已阅读并与天眼查达成协议，自愿接受本协议全部条款、规则及内容的约束。所有服务规则视为本条款不可分割的一部分，与本条款具有同等法律效力。
          </p>
          <p>
            本协议的订立双方为天眼查的实际运营商北京金堤科技有限公司（下称“
            <b>天眼查</b>”或“
            <b>我们</b>”）与使用天眼查相关服务的使用人（下称“
            <b>用户</b>”或“
            <b>您</b>”），本协议是您与天眼查之间关于您使用天眼查提供的各项服务所订立的服务条款及规则，与正式书面合同具有同等效力。
          </p>
          <p>天眼查重视依法保护用户的个人信息，我们将依照本协议及《隐私权政策》（链接地址：https://www.tianyancha.com/property/3）的规定收集、使用、储存和分享您的个人信息。本协议对个人信息保护相关内容未作明确规定的，均应以《隐私权政策》的内容为准。</p>
          <h3>一、用户注册及服务使用</h3>
          <p>
            1.“
            <b>天眼查账号</b>”是指您通过天眼查官方网页端或移动智能设备应用端注册的账号。部分天眼查服务，需要您在登录您的天眼查账号之后方可使用。您在注册时所填写的内容与个人资料必须真实、准确、有效，否则天眼查有权拒绝您的注册申请。在完成账号注册手续后，您将有权通过该账号使用天眼查服务。
          </p>
          <p>2.您应妥善保管账户及密码信息，由于您自身原因导致的账户或密码的泄露、遗忘等情形或其他原因所带来的损失，天眼查将配合采取必要措施以降低相关损失，但因此造成的不利后果，需由您自行承担。</p>
          <p>3.您在使用天眼查服务时，所发布的信息（包括用户名称、用户头像、社区问答等）及用户行为必须遵守国家有关法律规定以及天眼查服务规则，并承担一切因自己发布信息或其他行为导致的民事、行政、或刑事法律责任或其他不利后果。</p>
          <p>4.您在天眼查所发布或展示的信息，不得含有以下内容或用于以下目的：</p>
          <div>
            （1）违反宪法确定的基本原则的；
            <br />（2）危害国家安全，泄露国家机密，颠覆国家政权，破坏国家统一，损害国家荣誉和利益的；
            <br />（3）煽动民族仇恨、民族歧视，破坏民族团结的；
            <br />（4）破坏国家、地区间友好关系的；
            <br />（5）违背中华民族传统美德、社会公德、伦理道德、以及社会主义精神文明的；
            <br />（6）破坏国家宗教政策，宣扬邪教和封建迷信的；
            <br />（7）散布谣言或不实消息，扰乱社会秩序，破坏社会稳定的；
            <br />（8）煽动、组织、教唆恐怖活动、非法集会、结社、游行、示威、聚众扰乱社会秩序的；
            <br />（9）散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；
            <br />（10）侮辱或诽谤他人，侵犯他人肖像权、姓名权、名誉权、隐私权或其他人身权利的；
            <br />（11）以非法组织名义活动的；
            <br />（12）侵犯他人知识产权、商业秘密等合法权益的；
            <br />（13）含有违反法律、法规、国家政策及公序良俗的法律、行政法规禁止的其他内容的。
          </div>
          <p></p>
          <p>5.您不得为任何非法目的使用天眼查服务，且不得在未经天眼查事先书面允许的情况下，以任何形式利用或借助天眼查从事以下活动：</p>
          <div>
            （1）进入天眼查或其他计算机信息网络或者使用计算机信息网络资源的；
            <br />（2）对天眼查或其他计算机信息网络功能进行删除、修改或者增加的；
            <br />（3）进入计算机信息网络中对存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；
            <br />（4）制作、传播计算机病毒（包括木马）等破坏性程序；
            <br />（5）其他危害计算机信息网络安全的行为。
          </div>
          <p></p>
          <p>6.如果您在使用天眼查服务时，未能遵守本协议或其他服务规则的规定，为了维护良好服务环境，保障其他用户的合法权益，天眼查有权删除您发布的相关信息，暂时或永久禁止您在天眼查发布信息，直至封停您的账号，同时保留依法追究您的法律责任的权利。为配合上述目标实现，我们可能将系统内的相关记录，作为您违反法律和本协议的证据，加以保存或向监管部门提供。请您知悉并同意，天眼查采取前述措施时，无须通知您或事先获得您的同意。</p>
          <p>7.您在使用天眼查服务时存在违反法律、法规、规章或监管部门规范性文件规定的情形，或使用天眼查服务时侵犯第三方的合法权益，或利用天眼查服务从事任何侵犯第三方合法权益的行为，从而导致天眼查承担任何性质的赔偿、补偿或罚款而遭受损失的，您应当赔偿天眼查因此遭受的全部损失（为避免疑义，包括间接损失）。</p>
          <p>8.依照监管要求，对于天眼查在向您提供服务时向您提供的及/或您在使用天眼查服务时获取的数据及服务信息等，您应当仅在中华人民共和国大陆范围内储存及/或使用，同时您不得利用天眼查提供的数据及服务信息从事任何违反法律、法规或其他监管政策的行为。否则，由此产生的一切不利法律后果由您自行承担，且您应全额赔偿天眼查因此遭受的商誉、企业形象等损失。</p>
          <p>9.您不得以营利为目的，将您在使用天眼查服务时获得的服务信息或该服务自身向第三方出售或以其他形式提供。否则，天眼查有权停止向您提供服务，且您应支付相当于您因前述转售行为所获利益的违约金。</p>
          <p>10.您在使用天眼查服务时，与相关网络服务有关的设备（如个人电脑、手机、及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费）均应由您自行负担。</p>
          <h3>二、VIP会员服务条款</h3>
          <p>
            当您通过天眼查官方途径注册成为天眼查VIP会员（以下简称“
            <b>VIP会员</b>”）时，您在使用VIP会员服务的同时，须一并遵守本条的以下规定。为避免疑义，本条所指“VIP会员账号”或“账号”，包括企业套餐项下的子账号。
          </p>
          <h4>(一)成为VIP会员的方式</h4>
          <p>1.在成为VIP会员之前，您应先根据真实、准确信息注册成为天眼查用户。当您的个人资料发生变化，应及时修改，否则由此造成的VIP会员权利不能全面有效行使的责任，由您自身承担，天眼查有权因此取消您VIP会员资格，无须退还VIP会员费或给予其他任何形式的赔偿或补偿。</p>
          <p>2.您应通过天眼查指定的购买渠道成为天眼查VIP会员，获取天眼查VIP服务。</p>
          <p>3.您应通过天眼查指定支付渠道支付天眼查VIP会员服务费用（包括网银支付或第三方支付等方式），您在支付VIP会员服务费用之前，须认可该项服务标明之价格，确认接受相关的服务条款及支付条款，严格按照支付流程操作，并在支付时注意及确保支付环境安全，否则应自行承担全部不利后果。</p>
          <p>4.VIP会员的服务价格以天眼查网站上标注的详细资费标价为准，天眼查对会员的服务有修改价格、升级服务、增减服务内容等权利。</p>
          <p>5.当您通过天眼查指定或明示认可的购买途径及支付途径并按照服务标准完成服务费用支付，且天眼查通过后台完成VIP会员服务激活时，您即成为天眼查VIP会员，天眼查会员服务即时生效并开始计算服务期限。</p>
          <h4>（二）VIP会员服务的使用</h4>
          <p>1.天眼查向VIP会员提供的全部服务，均仅限于该VIP会员在天眼查平台内使用，任何以恶意破解等不法手段将天眼查服务内容与天眼查平台分离的行为（例如恶意修改天眼查展示信息），均不属于天眼查服务。由此引起的一切法律后果由行为人负责，天眼查将依法追究行为人的法律责任。</p>
          <p>2.当您开始实际使用天眼查各单项服务时，视为您已同意该单项服务的服务条款以及天眼查在该单项服务中发出的各类公告的规定（如有）。</p>
          <p>3.您应自行妥善保管、使用、维护您在天眼查申请取得的账号、账号信息及密码，并采取必要和有效的保密措施，避免与第三人共享账号及相关服务信息。非天眼查原因致使您账户密码泄漏以及因您保管、使用、维护不当造成损失的，天眼查无须承担与此有关的任何责任。</p>
          <p>4.VIP会员服务资费标准以天眼查网站上标注的详细资费标价为准，天眼查享有修改价格、升级服务、增减功能等权利。</p>
          <p>5.VIP会员服务具有固定的使用期限，您一旦成为VIP会员，即视为同意该服务使用期限的相关规定。</p>
          <p>6.成为VIP会员后，您有权停止或放弃接受天眼查服务，并有权注销天眼查用户账户，但天眼查无须向您退还已支付的任何费用。</p>
          <h4>（三）VIP会员使用规范</h4>
          <p>1.您知悉并同意：VIP会员账号同一时间同一账号仅可在1台移动通信设备上登录使用，超出上述范围使用的，将被强制下线。用户应当自行承担超范围使用而导致的任何损失，同时天眼查保留追究上述行为人法律责任的权利。</p>
          <p>2.您知悉并同意：您VIP会员账号内的行为（包括但不限于信息查询、信息发布等）均代表您本人行为，您应妥善保管您的账号及密码，通过天眼查官方渠道获取和使用VIP会员账号（亦包含通过该账号能够享受的天眼查会员服务，下同），并对该账号下的所有行为承担责任。</p>
          <p>
            <b>为保障您的账号安全，确保您的账号不被他人违规使用，您不应通过天眼查官方渠道之外的其他途径获取或使用天眼查VIP会员账号，或为他人通过其他途径获取或使用天眼查VIP会员账号提供条件。否则，天眼查有权视具体违规情节，采取强制修改密码直至封禁相关VIP会员账号等措施，暂停或终止为您提供服务，并无须退还任何费用。违规使用情形包括：</b>
          </p>
          <div>
            (1) 未经天眼查事先明示同意，转让、借用、出租、赠与或以其他方式，为他人使用您的VIP会员账号提供条件；
            <br />(2) 未经天眼查事先明示同意，通过爬虫工具、机器人软件等手段获取VIP会员服务或有关数据信息；
            <br />(3) 通过系统漏洞、黑色产业、滥用会员身份等不正当手段，侵犯天眼查或他人合法权益；
            <br />(4) 其他违反法律、法规或相关监管政策的行为，或违反本协议及其他服务规则的行为。
          </div>
          <p></p>
          <p>我们会基于如下标准判断您的账号是否存在前述违规使用情形：</p>
          <div>
            (1) 同一账号近期登录使用设备数量是否异常；
            <br />(2) 同一账号单日查询次数是否异常；
            <br />(3) 是否存在其他足以被认定为违规使用的具体行为。
          </div>
          <p></p>
          <p>如您发现您的账号遭到未经授权的使用时，请您立即通知天眼查，我们将协助您找回。</p>
          <h3>三、数据来源与责任限制</h3>
          <p>1.“天眼查”是由北京金堤科技有限公司开发的一款企业相关数据等公开信息查询工具。根据用户指令，天眼查的搜索引擎系统会以非人工检索方式生成用户检索的已经依法公开的企业信息。天眼查目前网站数据来源主要包括：</p>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />全国企业信用信息公示系统（https://gsxt.saic.gov.cn）
          </h1>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />中国裁判文书网（https://wenshu.court.gov.cn/Index）
          </h1>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />中国执行信息公开网（https://zhixing.court.gov.cn/search）
          </h1>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />国家知识产权局官方网站（https://www.sipo.gov.cn）
          </h1>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />国家工商总局商标局官方网站（https://sbj.saic.gov.cn）
          </h1>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />国家版权局官方网站（https://www.ncac.gov.cn）
          </h1>
          <p>
            <b>天眼查平台所登载的信息均来自于网络公开信息，天眼查仅对相关网站依法公示的信息向用户如实展示，并不主动编辑或修改被所公示网站上的信息的内容或其表现形式。受限于现有技术水平、各信息来源网站更新不同步等原因，对此类信息的展示，并不视为天眼查对其内容的真实性、准确性、完整性、时效性作出任何形式的确认或担保。请您在依据天眼查服务相关信息作出判断或决策前，自行进一步核实此类信息的完整或准确性，并自行承担使用后果。同时，天眼查承诺将不断提升技术水平，逐步完善服务信息来源质量与更新频次，为您提供更高质量的服务。</b>
          </p>
          <p>
            2.由于政府禁令、现行生效的适用法律或法规的变更、火灾、地震、瘟疫、战争、停电、通讯线路中断、电信部门技术调整、因政府管制而造成网站的暂时性关闭等其他任何影响网络正常运营的不可预见、不可避免、不可克服和不可控制的事件（“
            <b>不可抗力事件</b>”）；以及他人蓄意破坏，黑客攻击、计算机病毒，系统维护、系统升级，网络过载等技术问题（“
            <b>技术事件</b>”）而导致本网站不能访问而造成的本站所提供的信息及数据的延误、停滞或错误，天眼查无须承担责任。同时，天眼查承诺将不断完善技术设施与条件，尽最大努力避免技术事件的发生，在不可抗力事件或技术事件发生时，在条件允许的前提下尽最大努力修复，以确保您继续正常使用，最大程度地避免您的损失。
          </p>
          <p>3.请您知悉并同意，由于天眼查服务的互联网服务性质，因此在服务的各个环节中不可避免地会受到相关不确定因素的影响（如电信运营商、网络质量、您使用的设备型号及系统、您的地理位置等），由于前述不确定因素造成您无法正常使用天眼查服务的，天眼查无须承担任何责任。同时，天眼查承诺将在技术条件允许范围内尽最大努力为您解决，以确保您能够正常使用。</p>
          <p>4.当您通过移动智能设备应用端使用天眼查服务时，请您知悉，我们针对不同品牌、不同型号的终端设备，开发了不同的移动应用程序版本，请您根据实际情况选择合适的版本进行下载及安装。如果由于您天眼查之外的原因，导致您未能安装正确、对应的版本，我们无法保证该版本移动应用程序能够正常使用，并对因此给您造成的损失不予负责。</p>
          <h3>四、协议的变更</h3>
          <p>您知悉并同意，在监管要求更新或业务调整等原因下，我们可能会单方修订本协议部分条款。若有重大修订，我们会通过消息推送或其他显著方式向您发出通知，您可以查阅最新版本的协议条款，修订后的协议将在通知发出之日起生效。本协议条款修订后，如果您继续使用天眼查服务，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用天眼查服务。</p>
          <h3>五、争议解决及其他</h3>
          <p>1.本协议的成立、生效、履行、解释及争议解决，应适用中华人民共和国大陆地区法律（为避免疑义，不包括冲突法）。</p>
          <p>
            <b>2.若您就本协议或在使用天眼查服务过程中与天眼查之间发生任何纠纷或争议，首先应友好协商解决；一方以书面形式的协商意见发出之日起三十（30）日后，双方仍未就争议解决方案达成一致的，应将该争议提交北京金堤科技有限公司所在地有管辖权的人民法院诉讼解决。</b>
          </p>
          <p>3.本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p>
          <p>4.本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</p>
          <p>
            5.当您采用纸质合同、订货单或其他纸质文件（以下统称“
            <b>纸质合同</b>”）的形式购买天眼查服务时，您亦获得天眼查用户身份，享有本协议项下的权利，并应履行本协议项下的义务。纸质合同未尽事宜，以本协议规定为准。
          </p>
        </div>
      </div>
      <!-- 版权声明 -->
      <div class="about_body" style="position:relative;" name="3" id="3">
        <div class="about-title">版权政策</div>
        <p>除非天眼查另行声明，天眼查平台内的本网站（www.tianyancha.com）的所有产品、技术、软件、程序、数据及其他信息（包括但不限于文字、图像、图片、照片、音频、视频、图表、色彩、版面设计、电子文档）的所有权利所有知识产权（包括但不限于版权、商标权、专利权、商业秘密及其他所有相关权利）均归天眼查或其关联公司所有。未经天眼查许可，任何人不得擅自使用（包括但不限于通过任何机器人、蜘蛛等程序或设备监视、复制、传播、展示、镜像、上载、下载）天眼查平台内的任何内容。</p>
        <p>天眼查平台的Logo、“天眼查”、“tianyancha”等文字、图形及其组合，以及天眼查平台的其他标识、徽记、产品和服务名称均为天眼查及其关联公司在中国和其它国家的商标，未经天眼查书面授权，任何人不得以任何方式展示、使用或作其他处理，也不得向他人表明您有权展示、使用或作其他处理。</p>
        <p>天眼查尊重知识产权，反对侵权盗版行为。未经天眼查许可，任何人不得擅自（包括但不限于：以非法的方式复制、传播、展示、镜像、上载、下载）使用，或通过非常规方式（如：恶意干预天眼查数据）影响天眼查的正常服务，任何人不得擅自以软件程序自动获得天眼查数据。否则，天眼查有权依法追究其法律责任。</p>
        <p>未经天眼查许可，任何人禁止转载或商业使用天眼查网站内文字、图形、表格等信息，否则，天眼查保留采取一切合法方式维护正当利益的权利。经许可的信息的转载或商业使用时，应当以恰当方式说明，该信息来源于天眼查。</p>
      </div>
      <!-- 免责声明 -->
      <div class="user-body relief_body" style="position:relative;" name="4" id="4">
        <div class="about-title">免责声明</div>
        <p
          style
        >“天眼查”是由北京金堤科技有限公司开发的一款企业相关数据等公开信息查询工具。根据用户指令，天眼查的搜索引擎系统会以非人工检索方式生成用户检索的已经依法公开的企业信息。天眼查目前数据来源网站主要包括：</p>
        <div>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />全国企业信用信息公示系统（https://gsxt.saic.gov.cn）
          </h1>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />中国裁判文书网（https://wenshu.court.gov.cn/Index）
          </h1>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />中国执行信息公开网（https://zhixing.court.gov.cn/search）
          </h1>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />国家知识产权局官方网站（https://www.sipo.gov.cn）
          </h1>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />国家工商总局商标局官方网站（https://sbj.saic.gov.cn）
          </h1>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />国家版权局官方网站（https://www.ncac.gov.cn）
          </h1>
        </div>
        <h1>
          <b>天眼查平台所登载的信息均来自于网络公开信息，天眼查仅对相关网站依法公示的信息向用户如实展示，并不主动编辑或修改被所公示网站上的信息的内容或其表现形式。受限于现有技术水平、各信息来源网站更新不同步等原因，对此类信息的展示，并不视为天眼查对其内容的真实性、准确性、完整性、时效性作出任何形式的确认或担保。请您在依据天眼查服务相关信息作出判断或决策前，自行进一步核实此类信息的完整或准确性，并自行承担使用后果。同时，天眼查承诺将不断提升技术水平，逐步完善服务信息来源质量与更新频次，为您提供更高质量的服务。</b>
        </h1>
      </div>
      <!--权利通知-->
      <div class="user-body relief_body" style="position:relative;" name="5" id="5">
        <div class="about-title">权利通知</div>
        <div>
          <p>鉴于免责声明中公示信息来源网站中的信息数据更新存在一定时间周期，因此任何援引免责申明中所示网站数据信息的展示行为，其信息数据均可能存在数据与客观情形存在一定偏差的情形，如果，该信息数据的偏差无法通过天眼查页面数据更新或其他功能加以纠正，且该信息关联方已经与该信息发布单位沟通并取得信息发布方书面更正文件，则该信息关联方有权以以下途径向天眼查发送权利声明以便天眼查对相关信息加以修正。</p>
          <p>相关措施和步骤如下：</p>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />1) 权利通知的发出
          </h1>
          <p>任何个人或组织如对天眼查内容存在异议，该个人或组织应以书面的方式向天眼查提交权利通知。发出权利通知时应当同时符合以下两个条件：</p>
          <p>
            a) 权利人发现并可以证明天眼查所展示之内容侵犯了其合法权益；
            <br />b) 天眼查以自动检索方式而产生并展示的内容侵犯了上述权利人的合法权益的信息经过网页内信息手动刷新按钮刷新或采取其他措施后仍然无法得到更正。
          </p>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />2)权利通知的内容
          </h1>
          <p>
            为了天眼查有效处理上述个人或单位的权利通知，请使用以下格式与内容的方式进行权利通知， 否则，天眼查有权要求该权利通知发出者补充材料或拒绝作出修改：
            <br />a) 对任何权利提出的权利声明，都应提供相应完整的书面材料，以证明该权利的真实存在；
            <br />b) 权利人对涉嫌侵权行为的相关内容拥有合法权利或其他依法可以行使该权利的权属证明；
            <br />c) 权利通知应当充分、明确地描述被侵犯了权利人合法权益的具体内容并提供侵权信息展示页面的完整网页地址以及相关截屏资料。
            <br />d) 权利声明需提供权利人具体的联络信息，包括但不限于：
            <br />i.  自然人的姓名、身份证或护照复印件；
            <br />ii.  企业或其他法人组织的单位登记证明复印件，该组织法定代表人身份证或护照复印件， 如果该权利声明内容涉及除法定代表人以外的其他人员， 还应当同时附有法定代表人委托书及被委托人身份证或护照复印件；
            <br />iii.  权利声明主体的通信地址、电话号码、传真及电子邮箱地址；
            <br />iv.  其他可以以书面或电子信息联系到权利声明方的联系方式。
          </p>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />3) 权利声明需加入如下关于通知内容真实性的声明：
          </h1>
          <p>
            a) 我本人（或我单位）是所投诉内容的合法权利人，或，我本人（或我单位）已获授权，有权行使本权利声明中列明内容的权益；
            <br />b) 在我本人（或我单位）举报的天眼查页面上登载的内容侵犯了我本人（或我单位）相应的合法权益；
            <br />c) 我本人（或我单位）保证，本通知中所述信息是充分、真实、准确的；
            <br />d) 我本人（或我单位）确认：如果本权利通知内容不完全属实，我本人（或我单位）将承担由此产生的一切法律责任。
          </p>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />4) 权利通知的格式
          </h1>
          <p>请以书面打印件形式制作权利声明，对权利声明的全部内容请权利人及该文件直接关联人员亲自在每页文件纸张上签署姓名并写明签署时间与用途，如果权利声明主体系依法成立的机构或组织， 请您加盖该组织公章并由法定代表人亲自签署并写明签署时间与用途。</p>
          <p>除前款要求书写内容以外，其他任何形式的涂抹、删改、修正或任何可能引起对该文件被修改产生合理怀疑的行为与情形均有可能导致该文件不被采纳，请务必注意。</p>
          <h1>
            <img
              alt="·"
              src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/block.png"
              style="margin-right:10px;"
            />5) 权利通知的送达
          </h1>
          <div>
            请您把以上资料和联络方式书面发往以下地址，我们会在收到您的来函并结合实情况予以回复：
            <br />
            <span style="font-weight: 800">收信地址：</span>北京市海淀区知春路63号中国卫星通信大厦B座23层
            <br />
            <span style="font-weight: 800">来信请注明：</span>北京金堤科技有限公司（客服部）收
            <br />来信请注明客服部接收信息，否则将可能导致对该函件无人签收之情况。
            <br />请不要发送邮费到付文件或以其他收件方需要另行承担费用的方式寄送，否则，我司将拒绝接受该文件。
            <br />
            <span style="font-weight: 800">特别说明：</span>
            <br />天眼查一贯高度重视知识产权、商业秘密与个人隐私的保护并遵守中国各项法律、 法规和具有约束力的规范性文件。根据法律、法规和规范性文件要求， 天眼查制定了旨在保护权利人的合法权益的措施和步骤， 当权利人发现在天眼查生成的信息所展示的内容侵犯其合法权益时， 权利人应事先向天眼查发出书面的“权利通知”， 天眼查将根据中国法律法规和政府规范性文件采取措施移除相关内容或以其他技术手段加以处理。 若权利人及关联方未以该方式发送权利声明，则天眼查有权拒绝对网站所示数据与信息的修改或技术处理。
            <br />如果您所发出的权利通知的陈述失实，权利通知提交者将承担对由此造成的全部法律责任 （包括但不限于赔偿各种费用及律师费）。如果您无法确定网络上可获取的资料侵犯了何种法定权利， 天眼查建议您首先咨询专业人士。
          </div>
        </div>
      </div>
    </div>
    <Bottom />
  </div>
</template>

<script>
import Return from "../../components/Return.vue";
import Header from "../../components/Header.vue";
import Bottom from "../../components/Bottom.vue";
export default {
  components: { Return, Header, Bottom },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style  scoped>
.about-box {
  padding: 14px;
  font-size: 15px;
}

.about_body {
  width: 100%;
}
.about-title {
  width: 100%;
  height: 50px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #333333;
  line-height: 51px;
  position: relative;
  padding-left: 14px;
}
/* margin padding */
.pt2 {
  padding-top: 2px !important;
}

.pt4 {
  padding-top: 4px !important;
}

.pt5 {
  padding-top: 5px !important;
}

.pt8 {
  padding-top: 8px !important;
}

.pt10 {
  padding-top: 10px !important;
}

.pt12 {
  padding-top: 12px !important;
}

.pt14 {
  padding-top: 14px !important;
}

.pt15 {
  padding-top: 15px !important;
}

.pt20 {
  padding-top: 20px !important;
}

.pt24 {
  padding-top: 24px !important;
}

.pt25 {
  padding-top: 25px !important;
}

.pt28 {
  padding-top: 28px !important;
}

.pt30 {
  padding-top: 30px !important;
}

.pt40 {
  padding-top: 40px !important;
}

.pt80 {
  padding-top: 80px !important;
}

.pt100 {
  padding-top: 100px !important;
}

.pl2 {
  padding-left: 2px !important;
}

.pl4 {
  padding-left: 4px !important;
}

.pl5 {
  padding-left: 5px !important;
}

.pl8 {
  padding-left: 8px !important;
}

.pl10 {
  padding-left: 10px !important;
}

.pl12 {
  padding-left: 12px !important;
}

.pl14 {
  padding-left: 14px !important;
}

.pl15 {
  padding-left: 15px !important;
}

.pl18 {
  padding-left: 18px !important;
}

.pl20 {
  padding-left: 20px !important;
}

.pl25 {
  padding-left: 25px !important;
}

.pl30 {
  padding-left: 30px !important;
}

.pl40 {
  padding-left: 40px !important;
}

.pl50 {
  padding-left: 50px !important;
}

.pl80 {
  padding-left: 80px !important;
}

.pr2 {
  padding-right: 2px !important;
}

.pr4 {
  padding-right: 4px !important;
}

.pr5 {
  padding-right: 5px !important;
}

.pr8 {
  padding-right: 8px !important;
}

.pr10 {
  padding-right: 10px !important;
}

.pr12 {
  padding-right: 12px !important;
}

.pr14 {
  padding-right: 14px !important;
}

.pr15 {
  padding-right: 15px !important;
}

.pr18 {
  padding-right: 18px !important;
}

.pr20 {
  padding-right: 20px !important;
}

.pr25 {
  padding-right: 25px !important;
}

.pr30 {
  padding-right: 30px !important;
}

.pr40 {
  padding-right: 40px !important;
}

.pr50 {
  padding-right: 50px !important;
}

.pr80 {
  padding-right: 80px !important;
}

.pb2 {
  padding-bottom: 2px !important;
}

.pb4 {
  padding-bottom: 4px !important;
}

.pb5 {
  padding-bottom: 5px !important;
}

.pb7 {
  padding-bottom: 7px !important;
}

.pb8 {
  padding-bottom: 8px !important;
}

.pb10 {
  padding-bottom: 10px !important;
}

.pb11 {
  padding-bottom: 11px !important;
}

.pb12 {
  padding-bottom: 12px !important;
}

.pb14 {
  padding-bottom: 14px !important;
}

.pb15 {
  padding-bottom: 15px !important;
}

.pb20 {
  padding-bottom: 20px !important;
}

.pb30 {
  padding-bottom: 30px !important;
}

.pb35 {
  padding-bottom: 35px !important;
}

.pb40 {
  padding-bottom: 40px !important;
}

.pb60 {
  padding-bottom: 60px !important;
}

.pb100 {
  padding-bottom: 100px !important;
}

.ml2 {
  margin-left: 2px !important;
}

.ml4 {
  margin-left: 4px !important;
}

.ml5 {
  margin-left: 5px !important;
}

.ml6 {
  margin-left: 6px !important;
}

.ml8 {
  margin-left: 8px !important;
}

.ml10 {
  margin-left: 10px !important;
}

.ml12 {
  margin-left: 12px !important;
}

.ml14 15 {
  margin-left: 14 15px !important;
}

.ml20 {
  margin-left: 20px !important;
}

.ml30 {
  margin-left: 30px !important;
}

.ml40 {
  margin-left: 40px !important;
}

.ml74 {
  margin-left: 74px !important;
}

.ml-74 {
  margin-left: -74px !important;
}

.mr2 {
  margin-right: 2px !important;
}

.mr4 {
  margin-right: 4px !important;
}

.mr5 {
  margin-right: 5px !important;
}

.mr6 {
  margin-right: 6px !important;
}

.mr10 {
  margin-right: 10px !important;
}

.mr12 {
  margin-right: 12px !important;
}

.mr14 {
  margin-right: 14px !important;
}

.mr15 {
  margin-right: 15px !important;
}

.mr20 {
  margin-right: 20px !important;
}

.mr30 {
  margin-right: 30px !important;
}

.mr74 {
  margin-right: 74px !important;
}

.mr-74 {
  margin-right: -74px !important;
}

.mt0 {
  margin-top: 0px !important;
}

.mt2 {
  margin-top: 2px !important;
}

.mt3 {
  margin-top: 3px !important;
}

.mt4 {
  margin-top: 4px !important;
}

.mt5 {
  margin-top: 5px !important;
}

.mt8 {
  margin-top: 8px !important;
}

.mt10 {
  margin-top: 10px !important;
}

.mt14 {
  margin-top: 14px !important;
}

.mt15 {
  margin-top: 15px !important;
}

.mt20 {
  margin-top: 20px !important;
}

.mt30 {
  margin-top: 30px !important;
}

.mt74 {
  margin-top: 74px !important;
}

.mt-74 {
  margin-top: -74px !important;
}

.mb2 {
  margin-bottom: 2px !important;
}

.mb3 {
  margin-bottom: 3px !important;
}

.mb4 {
  margin-bottom: 4px !important;
}

.mb5 {
  margin-bottom: 5px !important;
}

.mb8 {
  margin-bottom: 8px !important;
}

.mb10 {
  margin-bottom: 10px !important;
}

.mb14 {
  margin-bottom: 14px !important;
}

.mb15 {
  margin-bottom: 15px !important;
}

.mb20 {
  margin-bottom: 20px !important;
}

.mb28 {
  margin-bottom: 28px !important;
}

.mb30 {
  margin-bottom: 30px !important;
}

.mb40 {
  margin-bottom: 40px !important;
}

.pad0 {
  padding: 0px !important;
}

.pad20 {
  padding: 20px !important;
}

.pad40 {
  padding: 40px !important;
}

/* font-size*/
.f0 {
  font-size: 0;
}

.f12 {
  font-size: 12px;
}

.f13 {
  font-size: 13px;
}

.f16 {
  font-size: 16px;
}

.f24 {
  font-size: 24px;
}

.f-base {
  font-size: 14px;
}

.f-title {
  font-size: 16px;
}
</style>
