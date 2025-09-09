# 📱 Milimate (밀리메이트)

**Milimate**는 군대 생활을 보다 편리하게 만들어주는 **통합 관리 앱**으로, 병사들의 동반자를 목표로 합니다.  
주요 기능은 **QR코드 기반의 식사 체크 시스템**으로 음식물 쓰레기 감소와 세금 낭비 방지를 지원하며, 식단 확인, PX 재고 조회, 알림 등 다양한 기능을 제공합니다.  

---

## 주요 기능
- **QR코드 식사 체크**  
  - 로그인 기반 QR코드 발급  
  - 식사 인원 및 식사량 데이터 자동 집계  
  - 기존 수작업 체크 대비 신속 · 정확 · 효율적  
- **병영 표준 식단 확인**  
  - 국방부 공공데이터 활용  
  - 선택된 부대(10개) 기준 실시간 식단 제공  
- **PX 인기 품목 조회**  
  - PX 인기 품목 데이터를 기반으로 상품명 DB 구성  
  - 병사들의 선호도를 분석할 수 있는 지표 제공  
- **데이터 분석 및 시각화 (확장 가능)**  
  - 식사 패턴, 재고 소모 패턴 분석  
  - 관리자 의사결정 지원  

---

## 서비스의 독창성
- **QR코드 기반 자동화**  
  - 휴대전화 사용 확대 추세에 맞춘 새로운 시스템  
  - 병사 편의성 + 관리자 업무 부담 경감  
- **확장성과 유연성**  
  - 부대별 상황/요구사항에 맞는 커스터마이즈 가능  
  - 향후 다양한 기능을 추가할 수 있는 확장성  

---

## 기술 스택
- **Frontend**: React Native  
- **Backend**: Node.js  
- **Database**: MySQL  
- **기능 구현**:  
  - QR코드 생성 (React 기반 QR Generator)  
  - 공공데이터 활용 (국방부 표준식단, PX 인기품목)
  - 로그인, 회원가입
  - 군번을 이용하여 간부, 병사 구분

---

## 활용 공공데이터
- [병영 표준 식단 – 국방부](https://data.mnd.go.kr/mbshome/mbs/data/subview.jsp?id=data_020000000000&dataUrl=openapi)  
- [PX 인기 품목 – 국방부](https://data.mnd.go.kr/mbshome/mbs/data/subview.jsp?id=data_020000000000&dataUrl=openapi)  

---

## 클러스터링 예시
- <img width="1528" height="754" alt="image" src="https://github.com/user-attachments/assets/2ff26ed2-85ec-4d01-be1e-be0cb9024135" />
- <img width="1414" height="739" alt="image" src="https://github.com/user-attachments/assets/bec612c5-7fc2-442c-8137-37b8481e7237" />
- <img width="1390" height="749" alt="image" src="https://github.com/user-attachments/assets/3cc126b0-b3a1-4b40-8311-a5885e89084f" />

