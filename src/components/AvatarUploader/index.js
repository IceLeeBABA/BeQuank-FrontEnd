// author @antd @kunduin

import { Upload, Icon, message } from "antd";
import React from "react";
import { version } from "../../services/apiOverview";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === "image/jpeg;image/png";
  if (!isJPG) {
    message.error("You can only upload JPG and PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJPG && isLt2M;
}

class AvatarUploader extends React.Component {
  constructor(props) {
    super(props);

    const value = props.value;
    this.state = {
      loading: false,
      imageUrl: value
    };
  }
  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          loading: false
        })
      );

      const { onChange = () => {} } = this.props;
      if (onChange) {
        onChange(info.file.response.url + "?x-oss-process=style/avatar");
      }
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${version}/user/avatar`}
        onChange={this.handleChange}
      >
        {this.props.value&&!this.state.loading ? (
          <img width={100} height={100} src={this.props.value} alt="avatar" />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}

export default AvatarUploader;
