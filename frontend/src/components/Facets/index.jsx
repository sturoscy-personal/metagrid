import React from 'react';
import { useAsync } from 'react-async';
import PropTypes from 'prop-types';
import { Form, Select, Row, Col } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import Alert from '../Feedback/Alert';
import Divider from '../General/Divider';
import Button from '../General/Button';
import Spin from '../Feedback/Spin';

import { isEmpty, humanize } from '../../utils/utils';
import { fetchBaseFacets, fetchProjects } from '../../utils/api';

const { Option } = Select;

const styles = {
  facetCount: { float: 'right' },
};

/**
 * Joins adjacent elements of the facets obj into a tuple using reduce().
 * https://stackoverflow.com/questions/37270508/javascript-function-that-converts-array-to-array-of-2-tuples
 * @param {Object.<string, Array.<Array<string, number>>} facets
 */
const parseFacets = (facets) => {
  const res = facets;
  const keys = Object.keys(facets);

  keys.forEach((key) => {
    res[key] = res[key].reduce((r, a, i) => {
      if (i % 2) {
        r[r.length - 1].push(a);
      } else {
        r.push([a]);
      }
      return r;
    }, []);
  });
  return res;
};

function Facets({
  project,
  availableFacets,
  setAvailableFacets,
  onProjectChange,
  onSetAppliedFacets,
}) {
  const [form] = Form.useForm();
  const [selectedProject, setSelectedProject] = React.useState({});

  const {
    data: projectsFetched,
    error: projectsError,
    isLoading: fetchingProjects,
  } = useAsync({
    promiseFn: fetchProjects,
  });

  const {
    data: facetsFetched,
    error: facetsError,
    isLoading: fetchingFacets,
    run,
  } = useAsync({
    deferFn: fetchBaseFacets,
  });

  /**
   * Set the component's project state if project was set using the NavBar.
   */
  React.useEffect(() => {
    setSelectedProject(project);
  }, [project]);

  /**
   * Fetch facets when the selectedProject changes and there are no results
   */
  React.useEffect(() => {
    if (!isEmpty(selectedProject)) {
      run(selectedProject.facets_url);
    }
  }, [run, selectedProject]);

  /**
   * Parse facets UI friendly format when facetsFetched updates.
   */
  React.useEffect(() => {
    if (!isEmpty(facetsFetched)) {
      const facetFields = facetsFetched.facet_counts.facet_fields;
      setAvailableFacets(parseFacets(facetFields));
    }
  }, [setAvailableFacets, facetsFetched]);

  /**
   * Handles when the facets form is submitted.
   *
   * The object of applied facets and removes facets that
   * have a value of undefined (no variables applied).
   * @param {Object.<string, [string, number]} appliedFacets
   */
  const handleOnFinish = (appliedFacets) => {
    onProjectChange(selectedProject);
    Object.keys(appliedFacets).forEach(
      // eslint-disable-next-line no-param-reassign
      (key) => appliedFacets[key] === undefined && delete appliedFacets[key]
    );
    onSetAppliedFacets(appliedFacets);
  };

  /**
   * Set the selectedProject by using the projectsFetched object
   * @param {string} name - name of the project
   */
  const onProjectSelect = (name) => {
    const selectedProj = projectsFetched.results.find(
      (obj) => obj.name === name
    );
    setSelectedProject(selectedProj);
  };

  return (
    <div data-testid="facets">
      <Row>
        <Col>
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => handleOnFinish(values)}
          >
            {projectsError && (
              <Alert
                message="Error"
                description="There was an issue fetching projects. Please contact support for assistance or try again later."
                type="error"
                showIcon
              />
            )}
            {fetchingProjects ? (
              <Spin></Spin>
            ) : (
              !projectsError && (
                <Form.Item label="Project">
                  <Select
                    value={project.name}
                    style={{ width: '100%' }}
                    onChange={(value) => onProjectSelect(value)}
                    tokenSeparators={[',']}
                    showArrow
                  >
                    {projectsFetched.results.map((projectObj) => {
                      return (
                        <Option key={projectObj.name}>{projectObj.name}</Option>
                      );
                    })}
                  </Select>
                  <Alert
                    message="Switching projects and applying facets will clear all applied constraints"
                    type="warning"
                    showIcon
                  />
                </Form.Item>
              )
            )}

            <Divider />
            {facetsError && (
              <Alert
                message="Error"
                description="There was an issue fetching facets for this project. Please contact support for assistance or try again later"
                type="error"
                showIcon
              />
            )}

            {fetchingFacets ? (
              <Spin></Spin>
            ) : (
              !facetsError &&
              availableFacets &&
              Object.keys(availableFacets).map((facet) => {
                return (
                  <Form.Item
                    style={{ marginBottom: '4px' }}
                    key={facet}
                    name={facet}
                    label={humanize(facet)}
                  >
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      tokenSeparators={[',']}
                      showArrow
                    >
                      {availableFacets[facet].map((variable) => {
                        return (
                          <Option key={variable[0]} value={variable[0]}>
                            {variable[0]}
                            <span style={styles.facetCount}>
                              ({variable[1]})
                            </span>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                );
              })
            )}
            {!facetsError && !fetchingFacets && (
              <Button
                type="primary"
                htmlType="submit"
                icon={<FilterOutlined />}
              >
                Apply Facets
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
}

Facets.propTypes = {
  project: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ).isRequired,
  availableFacets: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.string, PropTypes.number))
  ).isRequired,
  setAvailableFacets: PropTypes.func.isRequired,
  onProjectChange: PropTypes.func.isRequired,
  onSetAppliedFacets: PropTypes.func.isRequired,
};

export default Facets;
