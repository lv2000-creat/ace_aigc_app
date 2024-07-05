const pulic = {
    putSetLanguage: "/users/change_language", // 设置语言
    getUserInfo: "/users/me",
    postSignOut: "/users/sign_out", // 退出登录
    getDicts: "/dimensions",
    getEventMarketing: "/events/marketing",
    getPositionEnums: "/enums/position",
    getRegions: "/regions", //获取所有的地区
    getOss: "/oss/oss_token",
    getDocument: "/oss/get_download_url", // 文件的下载
    getTags: "/tags/list",
    getSelectCor: "/sators/corporations",
    getUnionOrgList: "/organization_events/registration_union_organizations", //获取所属机构
    getEventListDropdown: "/organization_events/registration_events", // 获取下拉框活动列表
    getHashtags: "/hashtags",
    getOrgMenberList: "/organizations/organization_users", // 获取当前组织用户列表
    postTranslate: "/translations", // 翻译
    getCampOrgList: "/organizations/camp_owners", // 获取营主主办方
    getCorporateList: "/sators/corporations", // 获取公司列表
    getOrgArticleList: "/organization_articles/article_list", // 获取文章列表
};

// 富文本编辑器
const quill = {
    postGpt: "/gpts", // 富文本创建gpt
    postPaperImport: "/organization_articles/convert", // 通过链接导入文章内容
};

const home = {
    getTranscribesList: "/transcribes", //获取转写历史
    postHelpAV: "/transcribes", // 音视频转为文本
    postTranscribeRetry: "/transcribes/:id/retry", //重试转写
    getTranscribeUrl: "/transcribes/:id/share", //分享
    getTranscribeHotwords: "/transcribes/hotwords", // 获取专有词汇
    getTranscribeLives:"/transcribes/lives",    //获取回放列表
    delTranscribe: "/transcribes/:id", // 删除
    getWordUrlInfo: "/ai_schedulers/url_meta", // 获取第三方
};

const task = {
    getTaskList: "/ai_schedulers", // 获取任务列表
    postTask: "/ai_schedulers", // 提交录制任务
    putTask: "/ai_schedulers/:id", // 更新录制任务
    delTask: "/ai_schedulers/:id", // 删除录制任务
    postStopTask: "/ai_schedulers/:id/stop", // 停止录制
};

// 转写详情
const transcribe = {
    getTranscribeDetail: "/transcribes/:id", // 获取转写详情
    getAsr: "/agoras/lives/:live_id/asr", //语音转文字
    postAiSummary: "/transcribes/:id/summary", // AI纪要
    getKeypoints: "/transcribes/:id/keypoints", // 获取关键点
    postKeypoints: "/transcribes/:id/keypoints", // 生成关键点
    putTranscribe: "/transcribes/:id", // 编辑
    postCopyToMyFile: "/transcribes/:id/fork", // 复制到我的文件
    postCreateArticle: "/transcribes/:id/create_article", // 发布文章
    getTranscribeDownload: "/transcribes/:id/download", //下载
    getKeyData: "/transcribes/:id/keynumbers", //获取关键数据
    postKeyData: "/transcribes/:id/keynumbers", //生成关键数据
    postReplaceTranscribes: "/transcribes/:id/replace", //替换AI纪要关键词
    getRiskOpportunity:"/transcribes/:id/risk_opportunity",//获取风险机遇
    postRiskOpportunity:"/transcribes/:id/risk_opportunity",//编辑风险机遇
    postSpeaker:"/transcribes/:id/speaker",//修改speaker
};

const third_account = {
    getAccounts: "/ai_third_accounts", // 获取三方账号
    getAccountMeetingList: "/ai_third_accounts/meetings", // 获取三方账号的会议列表
    postAccountSync: "/ai_third_accounts/sync", // 实时更新
    postAddAccount: "/ai_third_accounts", // 登录三方账号
    delAccount: "/ai_third_accounts", // 删除三方账号
    postAddTaskRecording: "/ai_third_accounts/scheduler", // 添加任务录制
    postCancelTaskRecording: "/ai_third_accounts/cancel_scheduler", // 取消录制任务
    postAutoJoinTask: "/ai_third_accounts/auto_scheduler", // 自动加入任务
};

// ai 翻译
const ai_translate = {
    getTranslateList: "/ai_translates", // 获取翻译列表
    postTranslate: "/ai_translates", // 翻译文本/文档
    delTranslate: "/ai_translates/:id", // 删除翻译
    putTranslate: "/ai_translates/:id", // 保存
    getTranslateDetail: "/ai_translates/:id", // 翻译详情
    getGlossaryList: "/ai_translates/glossaries", // 获取术语表
    getGlossaryDetailList: "/ai_translates/glossaries/:id", // 获取术语表详情
    postGlossary: "/ai_translates/glossaries", // 新建术语表
    putGlossary: "/ai_translates/glossaries/:id", // 编辑术语表
    delGlossary: "/ai_translates/glossaries/:id", // 编辑术语表
    getTranslateDownload: "/ai_translates/:id/download", // 下载
    postReplaceTranslates: "/ai_translates/:id/replace", //替换翻译中的关键词
};

const all = {
    ...pulic,
    ...quill,
    ...home,
    ...task,
    ...transcribe,
    ...third_account,
    ...ai_translate,
} as any;

export default all;
