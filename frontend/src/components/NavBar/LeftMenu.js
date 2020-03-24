import React from "react";
import { Button, Form, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const { Option } = Select;

function LeftMenu({ projects, text, onFinish, handleChange }) {
  LeftMenu.propTypes = {
    projects: PropTypes.string.isRequired,
    text: PropTypes.array.isRequired,
    onFinish: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
  };

  return (
    <div>
      <Form onFinish={onFinish}>
        <Input.Group compact>
          <Form.Item
            name="project"
            rules={[{ required: true, message: "Project is required" }]}
            style={{ width: "15%" }}
          >
            <Select placeholder="Project">
              {projects.map(project => (
                <Option key={project} value={project}>
                  {project}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="text"
            wrapperCol={{ sm: 24 }}
            rules={[{ required: true, message: "Text is required" }]}
            style={{ width: "75%" }}
          >
            <Input
              onChange={handleChange}
              value={text}
              placeholder="Search..."
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            <SearchOutlined />
          </Button>
        </Input.Group>
      </Form>
    </div>
  );
}

export default LeftMenu;
