import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import {
  Typography,
  Table,
  List,
  Layout,
  Descriptions,
  Tree,
  Icon,
  Input,
  AutoComplete,
  Tabs,
  Card,
  Collapse
} from "antd";
const { TabPane } = Tabs;
const { TreeNode } = Tree;
const { Panel } = Collapse;
const { Option, OptGroup } = AutoComplete;

const options = dataSource =>
  dataSource.map(group => (
    <OptGroup key={group.title} label={group.title}>
      {group.children.map(opt => (
        <Option key={opt.title} value={opt.title}>
          {opt.title}
          <span className="certain-search-item-count">count</span>
        </Option>
      ))}
    </OptGroup>
  ));

export const Search = ({ dataSource, setCurrentClass }) => (
  <div className="certain-category-search-wrapper" style={{ width: 250 }}>
    <AutoComplete
      className="certain-category-search"
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={false}
      dropdownStyle={{ width: 300 }}
      size="large"
      style={{ width: "100%" }}
      dataSource={options(dataSource)}
      placeholder="Search Classes"
      optionLabelProp="value"
      onSelect={item => setCurrentClass(item)}
    >
      <Input
        suffix={<Icon type="search" className="certain-category-icon" />}
      />
    </AutoComplete>
  </div>
);

export const Class = ({
  className,
  schema,
  service,
  instanceSet = { data: [] },
  getInstanceSet
}) => {
  const handleTabChange = key => {
    if (key === "Instances") {
      getInstanceSet(service.name);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: name => <p>{name}</p>
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: value => <p>{value}</p>
    },
    {
      title: "Required",
      dataIndex: "required",
      key: "required",
      render: required => <p>{required ? "True" : "False"}</p>
    },
    {
      title: "Unique",
      dataIndex: "unique",
      key: "unique",
      render: unique => <p>{unique ? "True" : "False"}</p>
    }
  ];
  let attributes = [];
  let relationships = [];
  const relationshipColumns = [
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      render: c => <p>{c ? c : ""}</p>
    },
    ...columns,
    {
      title: "Singular",
      dataIndex: "singular",
      key: "singular",
      render: singular => <p>{singular ? "True" : "False"}</p>
    }
  ];
  Object.keys(schema).forEach(key => {
    if (schema[key].ref) {
      relationships.push({
        key,
        name: key,
        value: schema[key].type,
        unique: schema[key].unique,
        required: schema[key].required,
        class: schema[key].ref,
        singular: schema[key].type !== "Array"
      });
    } else {
      if (key !== "extends") {
        attributes.push({
          key,
          name: key,
          value: schema[key].type,
          unique: schema[key].unique,
          required: schema[key].required
        });
      }
    }
  });

  console.table(attributes);
  console.table(relationships);

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  return (
    <Layout.Content style={{ paddingTop: "10px" }}>
      <Descriptions title={<Typography.Title>{className}</Typography.Title>}>
        {schema["extends"] !== undefined ? (
          <Descriptions.Item key={"extends"} label={"extends"}>
            {schema["extends"].type}
          </Descriptions.Item>
        ) : null}
      </Descriptions>

      <Tabs onChange={key => handleTabChange(key)}>
        <TabPane tab="Schema" key="Schema">
          <Typography.Title level={3}>Attributes</Typography.Title>
          <Table pagination={false} columns={columns} dataSource={attributes} />
          <Typography.Title level={3}>Relationships</Typography.Title>
          <Table
            pagination={false}
            columns={relationshipColumns}
            dataSource={relationships}
          />
        </TabPane>

        <TabPane tab="Services" key="Services">
          <List
            size="large"
            bordered
            dataSource={service.operations}
            renderItem={(operation, idx) => (
              <List.Item key={idx}>
                <Typography.Text>[{operation.methods}]</Typography.Text>{" "}
                {operation.path}
              </List.Item>
            )}
          />
        </TabPane>

        <TabPane
          tab={`Instances${instanceSet.total ? ` (${instanceSet.total})` : ""}`}
          key="Instances"
        >
          <List
            size="large"
            bordered={false}
            dataSource={instanceSet.data}
            renderItem={instance => (
              <Collapse
                key={instance._id}
                bordered={false}
                style={{ width: "100%" }}
              >
                <Panel header={instance.displayId}>
                  {Object.keys(instance).map(key => (
                    <Collapse key={`${instance._id}-${key}`} bordered={false}>
                      <Panel header={key}>
                        {// NULL
                        instance[key] === null ? (
                          "null"
                        ) : // UNDEFINED
                        instance[key] === undefined ? (
                          "undefined"
                        ) : // STRING OR NUMBER OR BOOLEAN
                        typeof instance[key] === "string" ||
                          typeof instance[key] === "number" ||
                          typeof instance[key] === "boolean" ? (
                          JSON.stringify(instance[key])
                        ) : // OBJECT
                        typeof instance[key] === "object" &&
                          !Array.isArray(instance[key]) ? (
                          <Card style={{ width: "100%" }}>
                            <Descriptions>
                              {Object.keys(instance[key]).map(subKey => (
                                <Descriptions.Item
                                  key={`${instance[key]._id}-${subKey}`}
                                  label={subKey}
                                >
                                  {// ARRAY IN OBJECT
                                  Array.isArray(instance[key][subKey]) ? (
                                    instance[key][subKey].map(i =>
                                      // OBJECT IN ARRAY IN OBJECT
                                      typeof i === "object" &&
                                      !Array.isArray(i) ? (
                                        <div>{i.displayId}</div>
                                      ) : // STRING OR NUMBER OR BOOLEAN IN ARRAY IN OBJECT
                                      typeof i === "string" ||
                                        typeof i === "number" ||
                                        typeof i === "boolean" ? (
                                        <div>{i}</div>
                                      ) : (
                                        <div>
                                          unknown type in array in object
                                        </div>
                                      )
                                    )
                                  ) : (
                                    <div>
                                      {JSON.stringify(instance[key][subKey])}
                                    </div>
                                  )}
                                </Descriptions.Item>
                              ))}
                            </Descriptions>
                          </Card>
                        ) : // ARRAY
                        Array.isArray(instance[key]) ? (
                          <Collapse bordered={false} style={{ width: "100%" }}>
                            {instance[key].map((item, idx) => (
                              <Panel header={item.displayId} key={idx}>
                                {// STRING OR NUMBER IN ARRAY
                                typeof item === "string" ||
                                typeof item === "number" ||
                                typeof item === "boolean" ? (
                                  JSON.stringify(item)
                                ) : // OBJECT IN ARRAY
                                typeof item === "object" &&
                                  !Array.isArray(item) ? (
                                  <Card style={{ width: "100%" }}>
                                    <Descriptions>
                                      {Object.keys(item).map(subKey => (
                                        <Descriptions.Item
                                          key={`${item._id}-${subKey}`}
                                          label={subKey}
                                        >
                                          {// STRING OR BOOLEAN OR NUMBER IN OBJECT IN ARRAY
                                          typeof item[subKey] === "string" ||
                                          typeof item === "number" ||
                                          typeof item === "boolean"
                                            ? JSON.stringify(item[subKey])
                                            : // OBJECT IN OBJECT IN ARRAY
                                            // instance = [ outer: { inner: {} } ]
                                            typeof item[subKey] === "object" &&
                                              !Array.isArray(item[subKey])
                                            ? item[subKey].displayId
                                            : // ARRAY IN OBJECT IN ARRAY
                                            // instance = [ obj: { arr: [] } ]
                                            Array.isArray(item[subKey])
                                            ? item[subKey].map(i => (
                                                <div>{i.displayId}</div>
                                              ))
                                            : JSON.stringify(item[subKey])}
                                        </Descriptions.Item>
                                      ))}
                                    </Descriptions>
                                  </Card>
                                ) : (
                                  <div>unknown in array</div>
                                )}
                              </Panel>
                            ))}
                          </Collapse>
                        ) : (
                          // ERROR OCCURED
                          <div>unknown instance</div>
                        )}
                      </Panel>
                    </Collapse>
                  ))}
                </Panel>
              </Collapse>
            )}
          />
        </TabPane>
      </Tabs>
    </Layout.Content>
  );
};
