import React from 'react';
import 'antd/dist/antd.css';

import { Button } from 'antd';
import {UploadOutlined } from '@ant-design/icons';

class ButtonLoad extends React.Component {
    state = {
        loadings: [],
    };

    enterLoading = index => {
        this.setState(({ loadings }) => {
            const newLoadings = [...loadings];
            newLoadings[index] = true;

            return {
                loadings: newLoadings,
            };
        });
        setTimeout(() => {
            this.setState(({ loadings }) => {
                const newLoadings = [...loadings];
                newLoadings[index] = false;

                return {
                    loadings: newLoadings,
                };
            });
        }, 6000);
    };

    render() {
        const { loadings } = this.state;
        return (
            <>
                <Button
                    type="primary"
                    htmlType="submit"

                    loading={loadings[1]}
                    onClick={() => this.enterLoading(1)}
                >
                    <UploadOutlined />
                    Upload
                </Button>

            </>
        );
    }
}

export default ButtonLoad;
