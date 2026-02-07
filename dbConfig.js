const oracledb = require('oracledb');

// Oracle Cloud接続設定
module.exports = {
  user: 'jinma',
  password: 'Teacher2025',
  connectString: `(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.ap-tokyo-1.oraclecloud.com))(connect_data=(service_name=g8c09a6a8bcac32_z3u87o1g28n1sl7w_tp.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))`
};
