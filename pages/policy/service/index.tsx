import React from "react";
import Image from "next/image";

const ServicePolicy = () => {
    return (
        <>
                <button className="my-5" onClick={() => window.history.back()}>
                    <Image src="/images/logo.png" alt="logo" width={100} height={100} />
                </button>    
                <h1 className="text-lg text-[#404040]">서비스 이용 약관</h1>
                <br/>
                <h6 className="text-sm text-gray-500">-2024년 3월 27일에 마지막으로 업데이트 됨. </h6>
                <br/>
                <div className="w-full">

                제 1 조 (목적)<br/>

                본 약관은 쿠석쿠석팀(이하 “제공자”, “팀”)이 제공하는 쿠석쿠석에 대해 제공자와 서비스를 이용하는 개인 위치 정보 주체(이하 “사용자”) 간의 권리·의무 및 책임사항, 기타 필요한 사항의 규정을 목적으로 합니다.<br/>

                제 2 조 (이용약관의 효력 및 변경)<br/>

                1. 본 약관은 사용자가 본 약관에 동의하고 팀이 정한 절차에 따라 앱 서비스의 사용자로 등록됨으로써 효력이 발생합니다.<br/>
                2. 팀은 법률이나 쿠석쿠석 서비스의 변경사항을 반영하기 위한 목적 등으로 약관을 수정할 수 있습니다.<br/>

                제 3 조 (약관 외 준칙)<br/>

                이 약관에 명시되지 않은 사항에 대해서는 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관계법령 및 팀이 정한 지침 등의 규정에 따릅니다.<br/>

                제 4 조 (서비스의 내용)<br/>

                팀은 사용자가 선택한 위치에 사진과 함께 게시글을 업로드하고 댓글을 달며 사용자끼리 특정 장소 정보를 공유하는 서비스를 제공합니다.<br/>

                제 5 조 (운영기준)<br/>

                운영 기준은 사용자가 서비스 이용시 주의해야 할 행위와 정보의 세부적인 사항이 규정되어 있으며, 해당 행위 등을 할 경우 서비스 이용에 어떠한 제한이 적용될 수 있는지 안내합니다.<br/>

                쿠석쿠석 서비스 사용자 모두가 안전하고 쾌적한 서비스를 이용할 수 있도록 운영 기준을 주의 깊게 읽고 서비스를 이용해 주시기를 부탁드리며, 정책을 위반하는 행위나 정보를 확인하시거나 다른 사용자로 인해 피해를 입으신 경우 팀 메일을 통해 제보하여 주시기 바랍니다.<br/>

                운영기준 조항의 내용에 열거되지 않은 행위일지라도 사용자의 안전을 위협하거나, 불쾌하거나 민감한 콘텐츠로 판단되는 등 서비스 이용약관 및 운영정책에 위반된다고 판단되는 행위가 있을 경우 제공자는 제재 조치를 취할 수 있습니다.<br/>

                [사용자 안전]<br/>
                <ul typeof="I">
                    <li>- 아동 청소년 대상 성범죄</li>
                    <li>- 성인 대상 성범죄</li>
                    <li>- 따돌림, 괴롭힘 등 사이버 폭력</li>
                    <li>- 범죄 행위 및 범죄 모의 행위 등</li>
                    <li>- 자살 및 자해</li>
                    <li>- 개인정보보호 위반</li>
                </ul>
                [불쾌하거나 민감한 컨텐츠]<br/>
                <ul>
                    <li>- 과도한 신체노출 및 성적행위 정보</li>
                    <li>- 폭력적이거나 혐오감 등을 유발하는 정보</li>
                    <li>- 증오 발언</li>
                </ul>    
                [불법 또는 규제 상품 및 서비스 관련 컨텐츠]<br/>
                <ul>
                    <li>- 불법 또는 규제 상품 및 서비스 등</li>
                    <li>- 청소년 유해 상품 및 서비스 등</li>
                </ul>    
                [안정성 및 신뢰성 확보]<br/>
                <ul>
                    <li>- 영리 목적의 광고성 정보 전송</li>
                    <li>- 제공자가 허용하지 않는 방법에 의한 서비스 이용</li>
                    <li>- 다량의 신고 누적</li>
                </ul>    
                [권리보호]<br/>
                <ol>
                <li>- 사생활침해, 명예훼손, 저작권침해 등 권리침해</li>
                </ol>
            </div>
        </>
    );
};

export default ServicePolicy;