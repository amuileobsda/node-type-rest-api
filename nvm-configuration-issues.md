# Node-Nvm-Set-Error
로컬에서 Node-Nvm-Set-Error


### [개요]Windows 개발환경 노드 버전 관리 매니저(nvm)활용

Nodejs 는 버전에 상당히 민감한 것 같다.   
여러 프로젝트를 동시에 진행 하다 보면 프로젝트에 맞게 Node 의 버전을 스위치 해야하는 경우가 생긴다.   
이 때 Node Version Manager(NVM) 를 사용해서 손 쉽게 내가 원하는 버전으로 Node 를 변경할 수 있다.   

로컬에서 npx-create-app@latest --ts로 프로젝트를 세팅하려는 데 자꾸 오류가 생겨 곰곰히 생각해보니     
npm과 nvm을 마구설치해서 충돌이 나는문제였던거같다.   
결국에는 npm을 pc에서 모두지우고 nvm사용으로 해결하였다.   

### 1. 기존에 설치된 Node.js제거

```
npm cache clean --force

'제어판 > 프로그램 추가/제거' 에서 Node.js 삭제

# 다음 경로의 폴더 삭제
C:\Program Files (x86)\Nodejs
C:\Program Files\Nodejs
C:\Users\User\AppData\Roaming\npm
C:\Users\User\AppData\Roaming\npm-cache
```

### 2. nvm설치

```
# 해당 사이트에서 nvm-setup.zip 파일을 다운로드 하고 압축 해제 후 설치
https://github.com/coreybutler/nvm-windows/releases
```

### 3. 설치가 완료되면 CMD 창을 열고 해당 명령어가 작동하는지 확인

```
nvm
```

### 4. nvm 에 설치된 Node 의 목록을 확인 할 수 있는 명령어를 입력

```
nvm ls
# 이때 No installations recognized. 나온다면 설치되어있는 Node가 없다는 것이다.
```


### 5. nvm에 Node설치를 진행

```
# (nvm install 버전)
nvm install 15.14.0
nvm install 14.17.0
```

### 6. nvm 에 설치된 Node 목록을 확인하고, 특정 버전을 활성화 한 뒤, Node 버전을 체크

```
nvm ls
nvm use 15.14.0
node -v
npm -v
```

### 7. 더 이상 사용하지 않는 버전을 삭제

```
nvm uninstall 14.17.0
nvm ls
```
